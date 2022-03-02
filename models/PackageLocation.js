"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PackageLocation.belongsTo(models.Package, {
        foreignKey: "package_id",
        sourcetKey: "id",
      });
    }
  }
  PackageLocation.init(
    {
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Package",
          key: "id",
        }
      },
      first_line: DataTypes.STRING,
      second_line: DataTypes.STRING,
      third_line: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "PackageLocation",
    }
  );
  return PackageLocation;
};
