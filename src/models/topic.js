"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.belongsTo(Topic, { as: "parent", foreignKey: "parentId" });
      Topic.hasMany(models.Posts, { as: "postsList", foreignKey: "topicId" });
      Topic.hasMany(Topic, { as: "children", foreignKey: "parentId" });
      // define association here
    }
  }
  Topic.init(
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
      modelName: "Topic",
    }
  );
  return Topic;
};
