'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      language: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      subTitle: {
        type: Sequelize.TEXT,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSON,
      },
      url: {
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
    await queryInterface.dropTable('events');
  },
};
