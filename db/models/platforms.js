'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class platforms extends Model {
    static associate(models) {
      platforms.hasMany(models.platformCashbacks, {
        foreignKey: 'platformId',
        as: 'cashbacks',
      });
    }
  }
  platforms.init(
    {
      name: DataTypes.STRING,
      label: DataTypes.STRING,
      cashback: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      averageRebate: DataTypes.FLOAT,
      limitPrice: DataTypes.FLOAT,
      marketPrice: DataTypes.FLOAT,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      titleImageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'platforms',
    }
  );
  return platforms;
};
