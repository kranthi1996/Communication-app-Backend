"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Package.hasOne(models.PackageLocation, {
        foreignKey: "package_id",
        sourcetKey: "id",
      });
    }
  }
  Package.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyword: {
        type: DataTypes.STRING,
      },
      description_note: {
        type: DataTypes.STRING,
      },
      package_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricing_note: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["inPerson", "online"],
      },
      availability_note: {
        type: DataTypes.STRING,
      },
      booking_message: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
