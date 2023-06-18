"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.News, { as: "newsList", foreignKey: "accountId" });
      Account.hasMany(models.Posts, {
        as: "postsList",
        foreignKey: "accountId",
      });
      Account.hasMany(models.CommentNews, {
        as: "commentNewsList",
        foreignKey: "accountId",
      });
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      birthday: { defaultValue: new Date("2001/01/01"), type: DataTypes.DATE },
      sex: { defaultValue: true, type: DataTypes.BOOLEAN },
      address: { defaultValue: "", type: DataTypes.STRING },
      province: { defaultValue: "", type: DataTypes.STRING },
      district: { defaultValue: "", type: DataTypes.STRING },
      ward: { defaultValue: "", type: DataTypes.STRING },
      phone: { unique: true, type: DataTypes.STRING(10) },
      gmail: { unique: true, type: DataTypes.STRING },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
