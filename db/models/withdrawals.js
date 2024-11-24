'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class withdrawals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  withdrawals.init(
    {
      userId: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      destinationAddress: DataTypes.STRING,
      status: DataTypes.STRING,
      txHash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'withdrawals',
      tableName: 'withdrawals',
    }
  );
  return withdrawals;
};
