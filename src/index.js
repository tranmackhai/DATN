import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
