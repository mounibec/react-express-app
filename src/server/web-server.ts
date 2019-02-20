import * as express from 'express';
import * as http from 'http';

import Conf from './configuration';
import db from './models';
import Router from './router';
import Middleware from './middleware';

export default class WebServer {
  _httpServer: http.Server = null;

  async connectToDB() {
    return db.sequelize.authenticate();
  }

  async start() {
    const configuration = Conf.get();

    await this.connectToDB();

    const app = express();
    this._httpServer = new http.Server(app);

    app.set('case sensitive routing', true);
    app.set('strict routing', true);
    app.set('x-powered-by', false);
    app.set('view engine', 'html');

    const router = new Router();
    const middleware = new Middleware(configuration.path);

    middleware.before(app);
    router.configure(app);
    middleware.after(app);

    this._httpServer.listen(configuration.port, () => {
      console.log(`Server listening on ${configuration.port}`);
    });
  }
}
