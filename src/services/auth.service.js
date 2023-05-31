const db = require("../models");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const accountService = require("./account.service");

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
        process.env.ACCESSTOKEN,
        { expiresIn: "365d" }
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
        process.env.ACCESSTOKEN,
        { expiresIn: "365d" }
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
          role: deCode.role,
        },
        process.env.ACCESSTOKEN,
        { expiresIn: "365d" }
      );
      return { data: accessToken, status: 201 };
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Error!!!" });
    }
  },
  getProfile: async (id) => {
    try {
      const { data } = await accountService.getById(id);
      return {
        status: 200,
        data: {
          user: data,
        },
      };
    } catch (error) {
      return { status: 500, data: { message: "Oops!!! Smomething's wrongs." } };
    }
  },
  // thay đổi mật khẩu, bên client dùng setting api privateClient, truyền current password với newpassword
  changePassword: async (id, body) => {
    const {currentpassword, newpassword} = body
    try {
      const user = await db.Account.findOne({
        raw: true,
        where: {
          id: parseInt(id),
        },
      });
      if (user) {
        const checkPassword = await argon.verify(
          user.password,
          currentpassword
        );
        if (checkPassword) {
          const hash = await argon.hash(newpassword);
          await db.Account.update(
            { hash },
            { where: { id: parseInt(id) } }
          );
          return {
            status: 200,
            data: {
              message: "Change password successfully",
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    return {
      status: 500,
      data: { message: "Error" },
    };
  },

  // thay đổi thông tin cá nhân,bên client dùng setting api privateClient
  changeProfile : async (id, body) => {
    // truyền name,sex,phone,address,birthday
    try {
      await db.Account.update({...body}, {
        where: {
          id: parseInt(id)
        }
      })
      return {
        status: 200,
        data: {
          message: "Change profile successfully",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: { message: "Error" },
      };
    }
  }
};
