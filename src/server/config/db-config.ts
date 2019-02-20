import Conf from '../configuration';

const dialect = 'mysql';

const NODE_ENV = Conf.env('NODE_ENV') || 'development';
const DB_USERNAME = Conf.env('DB_USERNAME', 'root');
const DB_PASSWORD = Conf.env('DB_PASSWORD', 'd4REn0LdCH4B');
const DB_NAME = Conf.env('DB_NAME', 'db_dev');
const DB_HOSTNAME = Conf.env('DB_HOSTNAME', '127.0.0.1');
const DB_PORT = Conf.env('DB_PORT', 3307);
const SQL_LOGGING = Conf.env('SQL_LOGGING', false);
const DATABASE_URL = Conf.env('DATABASE_URL', `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`);

const DB_PARAMS = {
  DATABASE_URL,
  dialect,
  port: DB_PORT,
  operatorsAliases: false,
  logging: SQL_LOGGING,
  seederStorage: 'sequelize',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const CONFIG: { [env: string]: object } = {
  "development": {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    ...DB_PARAMS
  },
  "test": {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME || "db_test",
    host: DB_HOSTNAME,
    ...DB_PARAMS
  },
  "production": {
    ...DB_PARAMS,
    use_env_variable: 'DATABASE_URL',
  }
};

export default CONFIG[NODE_ENV];
