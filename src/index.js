const express = require("express");
require("dotenv/config");
const cors = require("cors");
const routes = require("./routes/index.js");
const sequelize = require("./config/db.js");

const app = express();
const port = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use("/api", require("./routes/index.js"));
    app.listen(port, () => {
      console.log("Done");
    });
  });
