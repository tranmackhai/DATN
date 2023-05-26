const { Router } = require("express");
const upload = require("../middlewares/upload.middleware.js");
const fs = require("fs");
const { promisify } = require("util");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dhypn6jgk",
  api_key: "959357849573348",
  api_secret: "HhjjiJxZKVpxKY8l3BCBopsRIJE",
});

const uploadRouter = Router();
function generateFolder(date) {
  const year = date.getFullYear().toString().substring(2);
  const month =
    date.getMonth() + 1 > 9
      ? `${date.getMonth() + 1}`
      : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
  return `${year}${month}${day}`;
}

uploadRouter.post("/single", upload.single("image"), async (req, res) => {
  console.log(req);
  if (req.file) {
    const img = await cloudinary.uploader.upload(req.file.path, {
      folder: "IT_UTC2/Image/" + generateFolder(new Date()),
    });
    const unlinkAsync = promisify(fs.unlink);
    const path = __dirname.split("src")[0] + req.file.path;
    await unlinkAsync(path);
    return res.status(201).json({ data: img });
  } else {
    res.status(500).json({ message: "Error!!!" });
  }
});

uploadRouter.post("/multiple", upload.array("images"), async (req, res) => {
  try {
    if (req.files) {
      const result = [];
      const unlinkAsync = promisify(fs.unlink);
      const path = __dirname.split("src")[0];
      const files = req.files;
      const promises = [];
      const promiseImgs = [];
      for (let i = 0; i < files.length; i++) {
        const filePath = files[i].path;
        result.push({ path: filePath });
        promiseImgs.push(
          cloudinary.uploader.upload(filePath, {
            folder: "IT_UTC2/Image/" + generateFolder(new Date()),
          })
        );
      }
      const resultImgs = await Promise.all(promiseImgs);
      for (let i = 0; i < files.length; i++) {
        const filePath = path + files[i].path;
        if (fs.existsSync(filePath)) {
          promises.push(unlinkAsync(filePath));
        }
      }
      await Promise.all(promises);

      return res.status(201).json({ data: resultImgs });
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ message: "ERROR!!!" });
});

uploadRouter.post("/delete", async (req, res) => {
  try {
    const { path } = req.body;
    await cloudinary.uploader.destroy(
      "IT_UTC2/Image/" + path.split("IT_UTC2/Image/")[1].split(".")[0]
    );
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json({ message: "ERROR!!!" });
});

module.exports = uploadRouter;
