"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      mobile_number: {
        type: Sequelize.BIGINT,
      },
      country_code: {
        type: Sequelize.INTEGER,
      },
      time_zone: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM,
        values:["male", "female"]
      },
      user_type: {
        type: Sequelize.STRING,
      },
      user_status: {
        type: Sequelize.ENUM,
        values: ["active", "pending"],
      },
      facebook:{
        type:Sequelize.STRING
      }, 
      linkedin:{
        type:Sequelize.STRING
      },
      instagram:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable("users");
  },
};
