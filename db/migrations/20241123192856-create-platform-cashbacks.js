'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('platformCashbacks', {
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
        allowNull: false,
        references: {
          model: 'platforms', // name of Target model
          key: 'id', // key in Target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      balance: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('platformCashbacks');
  },
};
