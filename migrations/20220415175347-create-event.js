"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["Inperson", "Online"],
      },
      eventaccess: {
        type: Sequelize.ENUM,
        values: ["Pubic", "Private"],
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      endTime: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      attendees: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      address: {
        type: Sequelize.STRING,
      },
      venue: {
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
    await queryInterface.dropTable("events");
  },
};
