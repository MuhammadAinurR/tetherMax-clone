'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const db = {};
const pg = require('pg');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
});

db.events = require('./events')(sequelize, Sequelize.DataTypes);
db.platforms = require('./platforms')(sequelize, Sequelize.DataTypes);
db.binds = require('./binds')(sequelize, Sequelize.DataTypes);
db.referralCodes = require('./referralCodes')(sequelize, Sequelize.DataTypes);
db.platformCashbacks = require('./platformCashbacks')(
  sequelize,
  Sequelize.DataTypes
);
db.withdrawals = require('./withdrawals')(sequelize, Sequelize.DataTypes);
db.cashbackHistory = require('./cashbackHistory')(
  sequelize,
  Sequelize.DataTypes
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
