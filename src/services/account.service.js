const db = require("../models");
const argon = require("argon2");
const { Op } = require("sequelize");

module.exports = {
  create: () => {
    return { data: "", status: 201 };
  },

  createAdmin: async () => {
    try {
      const hash = await argon.hash("12345678");
      const saved = await db.Account.create({
        name: "Trần Mặc Khải",
        gmail: "tranmackhai@gmail.com",
        phone: "0337867708",
        password: hash,
        role: "admin",
      });

      const { password: _hash, ...others } = saved.dataValues;
      return { status: 201, data: { user: others } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Oops!!! Smomething's wrongs." } };
    }
  },

  getAll: async (query) => {
    try {
      const { limit, p, sortBy, sortType } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Account.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: { role: { [Op.ne]: "admin" } },
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },

  getById: async (id) => {
    try {
      const data = await db.Account.findOne({ where: { id } });
      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },

  // sửa tài khoản bên admin
  updateUser: async (id, body) => {
    try {
      await db.Account.update(body, {
        where: {
          id,
        },
      });
      return {
        status: 200,
        data: {
          message: "update success",
        },
      };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },

  search: async (query) => {
    // console.log(query);
    try {
      const { limit, p, sortBy, sortType, q, role } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Account.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          name: { [Op.iLike]: `%${q}%` },
          ...(role ? { role } : {}),
        },
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      // console.log(q);
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },
};
