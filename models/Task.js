"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      description:{
        type: DataTypes.TEXT,
      },
      created_by:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "task",
    }
  );
  return task;
};
