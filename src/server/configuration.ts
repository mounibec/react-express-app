import * as _ from 'lodash';

const {APP_PREFIX} = process.env;

type StrinOrNumOrBool = string | number | boolean;

class Configuration {
  path = '';
  appPrefix = APP_PREFIX || '';
  port = this.env('PORT') || 3030;
  secret = this.env('APPLICATION_SECRET ');
  baseUrl = this.env('BASE_URL') || `http://localhost:${this.port}`;

  constructor(path: string) {
    this.path = path;
  }

  env(name: string) {
    const withPrefix = `${this.appPrefix.toUpperCase()}_${name.toUpperCase().replace(this.appPrefix, '')}`;

    const withoutPrefix = name.toUpperCase().replace(this.appPrefix, '');

    const value = process.env[withPrefix] || process.env[withoutPrefix];

    try {
      //Type conversion
      return JSON.parse(value);
    } catch (_) {
      return value;
    }
  }
}

const initialize = _.once(() => new Configuration(__dirname));

export default {
  get: () => initialize(),
  env: (name: string, orDefault: StrinOrNumOrBool = null) => initialize().env(name) || orDefault
};
