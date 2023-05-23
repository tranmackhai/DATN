"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentNews.belongsTo(models.Account, { as: "account", foreignKey: "accountId" });
      CommentNews.belongsTo(models.News, { as: "news", foreignKey: "newsId" });
      CommentNews.belongsTo(CommentNews, {
        as: "parent",
        foreignKey: "parentId",
      });
      CommentNews.hasMany(CommentNews, {
        as: "children",
        foreignKey: "parentId",
      });
    }
  }
  CommentNews.init(
    {
      content: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
      newsId: DataTypes.INTEGER,
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CommentNews",
    }
  );
  return CommentNews;
};
