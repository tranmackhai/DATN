const express = require("express");
require("dotenv/config");
const cors = require("cors");
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
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", require("./routes/index.js"));
    app.listen(port, () => {
      console.log("Done");
    });
  });
