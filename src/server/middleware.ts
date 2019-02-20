import * as express from 'express';
import * as parser from 'body-parser';
import * as compression from 'compression';
import * as morgan from 'morgan';

import LOGGER from './lib/logger-service';

export default class Middleware {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  static getHostname(req: express.Request) {
    if (!req || !req.headers) {
      return console.warn('you should pass a Request object that possesses at least an attribute called "headers" ');
    }
    return req.headers['x-forwarded-server'] ? req.headers['x-forwarded-server'] : req.headers.host ? req.headers.host : 'localhost';
  }

  /**
   * Configure Express app middleware.
   * Middleware will be added at the beginning of the stack.
   */
  before(app: express.Express) {
    /**
     * Use JSON Body parser...
     */
    app.use(parser.json({strict: false}));
    app.use(parser.text());

    /**
     * Compress requests...
     */
    app.use(compression());

    app.get('/robots.txt', function (req, res) {
      res.type('text/plain');
      res.send("User-agent: *\nDisallow: /");
    });

    app.use(
      morgan(
        (tokens, req, res) => {
          return [
            tokens.method(req, res),
            `hostname: "${Middleware.getHostname(req)}"`,
            'source: "MORGAN"',
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
          ].join(' ');
        },
        {
          stream: LOGGER.stream
        }
      ));
  }

  /**
   * Configure Express app middleware.
   * Middleware will be added at the end of the stack.
   */
  after(app: express.Express) {
    /**
     * Server error handler.
     */
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => { // eslint-disable-line no-unused-vars
      if (err.message) {
        return res.status(403).send(err.message);
      }

      LOGGER.error(err.stack || err.toString(), {hostname: Middleware.getHostname(req)});
      res.status(500).send('Oops! An error has occurred. Please contact the service Admin.');
    });

  }
}
