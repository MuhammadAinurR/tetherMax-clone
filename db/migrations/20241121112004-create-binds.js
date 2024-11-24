'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('binds', {
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
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      platformId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'platforms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isBind: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // Add unique constraint to prevent duplicate bindings
    await queryInterface.addIndex('binds', ['userId', 'platformId'], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('binds');
  },
};
