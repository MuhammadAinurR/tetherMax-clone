'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class platformCashbacks extends Model {
    static associate(models) {
      platformCashbacks.belongsTo(models.platforms, {
        foreignKey: 'platformId',
        as: 'platform',
      });
    }
  }
  platformCashbacks.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platformId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'platformCashbacks',
    }
  );
  return platformCashbacks;
};
