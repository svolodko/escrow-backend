'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      created_by: {
        type: Sequelize.STRING(13)
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.JSON
      },
      buyer: {
        type: Sequelize.STRING(13)
      },
      seller: {
        type: Sequelize.STRING(13)
      },
      arbiter: {
        type: Sequelize.STRING(13)
      },
      days: {
        type: Sequelize.INTEGER
      },
      funded: {
        type: Sequelize.DATE
      },
      expires: {
        type: Sequelize.DATE
      },     
      flags: {
        type: Sequelize.INTEGER
      },
      delivery_memo: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('deals');
  }
};