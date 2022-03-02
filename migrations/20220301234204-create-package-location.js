"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PackageLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      first_line: Sequelize.STRING,
      second_line: Sequelize.STRING,
      third_line: Sequelize.STRING,
      postal_code: Sequelize.STRING,
      state: Sequelize.STRING,
      country: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('PackageLocations', {
      fields: ['package_id'],
      type: 'foreign key',
      name: 'FK_PL_PACKAGE_LOCATION',
      references: {
        table: 'Packages',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PackageLocations');
  },
};
