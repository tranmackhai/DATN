const db = require("../models");

module.exports = {
  create: () => {
    return { data: "test", status: 202 };
  },
  getAll: async (query) => {
    try {
      const { limit, p, sortBy, sortType } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Account.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
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
};
