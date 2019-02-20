import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';

const basename:string = path.basename(__filename);
const DB_CONFIG = require(path.resolve(__dirname, '..', 'config/db-config')).default;

type DB = {
  [name: string]: any
};

let db: DB = {};

const sequelize = DB_CONFIG.DATABASE_URL ? new Sequelize(DB_CONFIG.DATABASE_URL, DB_CONFIG) :
  new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, DB_CONFIG);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file: string) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
