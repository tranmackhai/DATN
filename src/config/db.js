const { Sequelize } = require ("sequelize");

const sequelize = new Sequelize("IT_UTC2", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false
});

module.exports = sequelize;
