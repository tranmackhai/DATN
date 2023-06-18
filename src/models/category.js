"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });
      Category.hasMany(models.Posts, {
        as: "postsList",
        foreignKey: "categoryId",
      });
      Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
      // define association here
    }
  }
  Category.init(
    {
      title: DataTypes.STRING,
      slug: { type: DataTypes.STRING, unique: true },
      description: DataTypes.STRING,
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
