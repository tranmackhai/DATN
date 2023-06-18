const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create: async (body) => {
    console.log(body);
    try {
      const data = await db.Category.create({
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
      const { limit, p, sortBy, sortType, slug, parentId } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Category.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          ...(slug ? { slug } : {}),
          ...(parentId
            ? {
                parentId: { [Op.ne]: parentId === "null" ? null : parentId },
              }
            : {}),
        },
        include: [
          {
            model: db.Category,
            as: "children",
          },
          { model: db.Category, as: "parent" },
        ],
        order: [[sortBy || "createdAt", sortType || "DESC"]],
      });
      return { status: 200, data: { rows, count } };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },

  update: async (id, body) => {
    try {
      const data = await db.Category.update(body, { where: { id } });
      return { data: { message: "Successfully!" }, status: 200 };
    } catch (error) {
      console.log(error);
      return { data: { message: "Wrooong!!" }, status: 500 };
    }
  },

  delete: async (id) => {
    try {
      const data = await db.Category.destroy({ where: { id } });
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
      const { rows, count } = await db.Category.findAndCountAll({
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
      const { limit, p, sortBy, sortType, isActive, q } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Category.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          title: { [Op.iLike]: `%${q}%` },
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
