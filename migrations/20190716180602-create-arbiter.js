'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('arbiters', {
      account: {
        allowNull: false,
        type: Sequelize.STRING(13),
        primaryKey: true,
      },
      contact_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      iso_country: {
        type: Sequelize.STRING
      },
      processed_deals: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.INTEGER(1)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('arbiters');
  }
};