'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('arbiters', [{
      account: 'escrowchris1',
      contact_name: 'Chris',
      email: 'chris@domain.com',
      description: 'Blah blah',
      website: 'https://www.domain.com',
      phone: '+1347824947932141',
      iso_country: 'US',
      processed_deals: 2, 
      is_active: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Arbiters', null, {});
  }
};
