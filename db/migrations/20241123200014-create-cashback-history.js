'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cashbackHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      platformId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'platforms',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'SUCCESS', 'FAILED'),
        defaultValue: 'PENDING',
        allowNull: false,
      },
      hashLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      network: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      crypto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      walletAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      convertedAmount: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cashbackHistories');
  },
};
