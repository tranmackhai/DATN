"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(Posts, { as: "parent", foreignKey: "parentId" });
      Posts.belongsTo(models.Topic, { as: "topic", foreignKey: "topicId" });
      Posts.hasMany(Posts, { as: "children", foreignKey: "parentId" });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      accountId: DataTypes.INTEGER,
      topicId: DataTypes.INTEGER,
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
