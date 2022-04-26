'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      taskUsers.belongsTo(models.task, {
        foreignKey: 'task_id',
        sourceKey: 'id'
      });
    }
  }
  taskUsers.init({
    email: DataTypes.STRING,
    task_id: DataTypes.INTEGER, 
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'taskUsers',
  });
  return taskUsers;
};