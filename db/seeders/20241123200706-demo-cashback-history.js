'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const platforms = await queryInterface.sequelize.query(
      `SELECT id from platforms;`
    );
    const platformRows = platforms[0];

    await queryInterface.bulkInsert(
      'cashbackHistories',
      [
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo',
          platformId: platformRows[0].id,
          amount: 25.0,
          type: 'EARN',
          status: 'SUCCESS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cashbackHistories', null, {});
  },
};
