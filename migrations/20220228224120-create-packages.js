"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keyword: {
        type: Sequelize.STRING,
      },
      description_note: {
        type: Sequelize.STRING,
      },
      package_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pricing_note: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["inPerson", "online"],
      },
      availability_note: {
        type: Sequelize.STRING,
      },
      booking_message: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Packages');
  },
};
