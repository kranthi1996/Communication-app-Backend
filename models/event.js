"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type:{
        type: DataTypes.ENUM,
        values: ["Inperson", "Online"],
      },
      eventaccess:{
        type: DataTypes.ENUM,
        values: ["Pubic", "Private"],
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE
      },
      endTime: {
        type: DataTypes.STRING
      },
      link: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      attendees: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      address: {
        type: DataTypes.STRING,
      },
      venue: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};
