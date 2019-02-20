import * as express from 'express';
import * as webpackDevMiddleware from  'webpack-dev-middleware';
import * as webpack from  'webpack';

// @ts-ignore
import pkg from '../../package.json';

import Conf from './configuration';

const NODE_ENV = Conf.env('NODE_ENV');

export default class Router {
  app: express.Express;

  configure(app: express.Express) {
    this.app = app;

    if (NODE_ENV !== "production") {
      let webpackConfig = require(`../../webpack/webpack.development.config.js`);
      this.app.use(webpackDevMiddleware(webpack(webpackConfig), {publicPath: webpackConfig.output.publicPath}));
    } else {
      this.app.use(express.static('dist/src/client'));
    }

    this._setRoutes();
  }

  _setRoutes() {
    this.app.get('/app', (req, res) => {
      res.send({name: pkg.name, version: pkg.version})
    });
  }
}
