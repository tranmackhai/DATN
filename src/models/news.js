"use strict";
const { Model, BOOLEAN } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Account, {
        as: "account",
        foreignKey: "accountId",
      });
      News.hasMany(models.CommentNews, {
        as: "commentNewsList",
        foreignKey: "newsId",
      });
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      accountId: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      slug: { type: DataTypes.STRING, unique: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "News",
      paranoid: true,
    }
  );
  return News;
};
