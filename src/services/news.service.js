const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create: async (body) => {
    console.log(body);
    try {
      const data = await db.News.create({
        ...body,
        // type: "recruitment",
        // accountId: 4,
      });
      return { data: data, status: 201 };
    } catch (error) {
      console.log(error);
      return { data: { message: "Wrooong!!" }, status: 500 };
    }
  },
  getAll: async (query) => {
    // console.log(query);
    try {
      const { limit, p, type, sortBy, sortType, slug, isActive } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.News.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          type: type || "recruitment",
          ...(slug ? { slug } : {}),
          ...(isActive ? { isActive } : {}),
        },
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },
  updateStatus: async (slug) => {
    try {
      const data = await db.News.update(
        { isActive: true },
        { where: { slug } }
      );
      return { data: { message: "Successfully!" }, status: 200 };
    } catch (error) {
      console.log(error);
      return { data: { message: "Wrooong!!" }, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const data = await db.News.destroy({ where: { id } });
      return { data: { message: "Successfully!" }, status: 200 };
    } catch (error) {
      console.log(error);
      return { data: { message: "Wrooong!!" }, status: 500 };
    }
  },
  getByUser: async (id, query) => {
    try {
      const { limit, p, sortBy, sortType } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.News.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          accountId: parseInt(id),
        },
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },
  search: async (query) => {
    // console.log(query);
    try {
      const { limit, p, type, sortBy, sortType, isActive, q } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.News.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          type: type || "recruitment",
          title: { [Op.iLike]: `%${q}%` },
          ...(isActive ? { isActive } : {}),
        },
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },
};
