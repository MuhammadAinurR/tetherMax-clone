'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const platforms = await queryInterface.sequelize.query(
      `SELECT id from platforms;`
    );
    const platformRows = platforms[0];

    await queryInterface.bulkInsert(
      'binds',
      [
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo',
          platformId: platformRows[0].id,
          uid: '123456782A',
          isBind: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo',
          platformId: platformRows[1].id,
          uid: '123456BDSF',
          isBind: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'user_2p4qglc2DyDFCW0Vs5sx24AGsPo',
          platformId: platformRows[2].id,
          uid: '123456ZSADR',
          isBind: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('binds', null, {});
  },
};
