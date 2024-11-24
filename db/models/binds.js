'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class binds extends Model {
    static associate(models) {
      binds.belongsTo(models.platforms, {
        foreignKey: 'platformId',
      });
    }
  }
  binds.init(
    {
      userId: DataTypes.STRING,
      uid: DataTypes.STRING,
      platformId: DataTypes.INTEGER,
      isBind: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'binds',
    }
  );
  return binds;
};
