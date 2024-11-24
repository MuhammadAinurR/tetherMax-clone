'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cashbackHistory extends Model {
    static associate(models) {
      cashbackHistory.belongsTo(models.platforms, {
        foreignKey: 'platformId',
        as: 'platform',
      });
    }
  }
  cashbackHistory.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platformId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'platforms',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
        defaultValue: 'PENDING',
        allowNull: false,
      },
      hashLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      network: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      crypto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      convertedAmount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'cashbackHistory',
      tableName: 'cashbackHistories',
    }
  );
  return cashbackHistory;
};
