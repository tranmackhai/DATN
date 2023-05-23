const db = require("../models");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (body) => {
    try {
      const { name, password, phone, gmail, role } = body;
      const hash = await argon.hash(password);
      const saved = await db.Account.create({
        name,
        gmail,
        phone,
        password: hash,
        role,
      });
      const accessToken = jwt.sign(
        {
          id: saved.id,
          is_admin: false,
        },
        "backdoor",
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        {
          id: saved.id,
          is_admin: false,
        },
        "backdoored",
        { expiresIn: "365d" }
      );

      const { password: _hash, ...others } = saved.dataValues;
      return { status: 201, data: { accessToken, refreshToken, user: others } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Oops!!! Smomething's wrongs." } };
    }
  },
  login: async (body) => {
    try {
      const { gmail, password } = body;
      const findGmail = await db.Account.findOne({
        where: {
          gmail,
        },
      });

      if (!findGmail) {
        return { data: "Email hoặc mật khẩu không chính xác", status: 400 };
      }

      const checkPassword = await argon.verify(findGmail.password, password);
      if (!checkPassword) {
        return { data: "Email hoặc mật khẩu không chính xác", status: 400 };
      }

      const accessToken = jwt.sign(
        {
          id: findGmail.id,
          is_admin: false,
        },
        "backdoor",
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        {
          id: findGmail.id,
          is_admin: false,
        },
        "backdoored",
        { expiresIn: "365d" }
      );

      const { password: _hash, ...others } = findGmail.dataValues;
      return { status: 201, data: { accessToken, refreshToken, user: others } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Oops!!! Smomething's wrongs." } };
    }
  },
  refreshToken: async (req) => {
    try {
      if (!req.cookie) {
        return { status: 401, data: { message: "Vui lòng đăng nhập" } };
      }
      const refreshToken = req.cookie["refreshToken"];
      if (!refreshToken) {
        return { status: 401, data: { message: "Vui lòng đăng nhập" } };
      }
      const deCode = jwt.verify(refreshToken, process.env.RF, {
        ignoreExpiration: true,
      });
      const accessToken = jwt.sign(
        {
          id: deCode.id,
          is_admin: deCode.is_admin,
        },
        "backdoor",
        { expiresIn: "5m" }
      );
      return { data: accessToken, status: 201 };
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Error!!!" });
    }
  },
};
