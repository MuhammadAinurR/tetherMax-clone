'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('./data/platforms.json');
    await queryInterface.bulkInsert(
      'platforms',
      data.map((platform) => ({
        ...platform,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('platforms', null, {});
  },
};
