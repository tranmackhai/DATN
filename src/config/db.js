const { Sequelize } = require ("sequelize");

const sequelize = new Sequelize("IT_UTC2", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
