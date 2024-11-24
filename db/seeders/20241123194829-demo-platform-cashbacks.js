'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get the platforms
    const platforms = await queryInterface.sequelize.query(
      `SELECT id from platforms;`
    );
    const platformRows = platforms[0];

    await queryInterface.bulkInsert(
      'platformCashbacks',
      [
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo', // Replace with your test user ID
          platformId: platformRows[0].id, // Binance
          balance: 25.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo', // Replace with your test user ID
          platformId: platformRows[1].id, // OKX
          balance: 15.75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo', // Replace with your test user ID
          platformId: platformRows[2].id, // Bybit
          balance: 32.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('platformCashbacks', null, {});
  },
};
