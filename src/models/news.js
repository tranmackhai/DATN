'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Account, { as: "account", foreignKey: "accountId" });
      News.hasMany(models.CommentNews, { as: "commentNewsList", foreignKey: "newsId" });
    }
  }
  News.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};