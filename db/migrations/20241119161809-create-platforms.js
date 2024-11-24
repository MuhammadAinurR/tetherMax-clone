'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('platforms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      label: {
        type: Sequelize.STRING,
      },
      cashback: {
        type: Sequelize.FLOAT,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      averageRebate: {
        type: Sequelize.FLOAT,
      },
      limitPrice: {
        type: Sequelize.FLOAT,
      },
      marketPrice: {
        type: Sequelize.FLOAT,
      },
      url: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      titleImageUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('platforms');
  },
};
