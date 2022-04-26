"use strict";
const { Model, Sequelize } = require("sequelize");
const mobile_regExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: {
        type:DataTypes.STRING,
        allowNull: false
      },
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      mobile_number: {
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: true,
          is: mobile_regExp,
        },
      },
      country_code: DataTypes.INTEGER,
      password: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      time_zone: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
      },
      user_type: DataTypes.STRING,
      user_status: {
        type: DataTypes.ENUM,
        values: ["active", "pending"],
      },
      address:{
        type: DataTypes.JSON,
      },
      facebook: {
        type: DataTypes.STRING,
      },
      linkedin: {
        type: DataTypes.STRING,
      },
      instagram: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
