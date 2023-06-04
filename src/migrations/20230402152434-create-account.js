"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Accounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING(10),
        unique: true,
      },
      sex: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      province: { type: Sequelize.STRING, defaultValue: "" },
      district: { type: Sequelize.STRING, defaultValue: "" },
      ward: { type: Sequelize.STRING, defaultValue: "" },
      birthday: {
        type: Sequelize.DATE,
        defaultValue: new Date("2001/01/01"),
      },
      gmail: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
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
    await queryInterface.dropTable("Accounts");
  },
};
