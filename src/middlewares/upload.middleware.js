const { mkdirSync } = require("fs");
const multer = require("multer");
const { extname } = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./`;
    mkdirSync(path, { recursive: true });
    console.log("Dốt");
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const ext = extname(file.originalname);
    console.log(file.originalname.split(ext)[0] + new Date().getTime() + ext);
    cb(null, file.originalname.split(ext)[0] + new Date().getTime() + ext);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
