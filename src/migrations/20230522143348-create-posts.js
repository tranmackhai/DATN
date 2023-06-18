"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      content: {
        type: Sequelize.TEXT,
      },
      accountId: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Posts");
  },
};
