const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create: async (body, accountId) => {
    console.log(body);
    try {
      let data = await db.Posts.create({
        ...body,
        accountId,
      });
      data = await db.Posts.findOne({
        where: { id: data.id },
        include: [
          {
            model: db.Category,
            as: "category",
          },
          {
            model: db.Account,
            as: "account",
          },
          {
            model: db.Posts,
            as: "parent",
            include: [{ model: db.Account, as: "account" }],
          },
        ],
      });
      return { data: data, status: 201 };
    } catch (error) {
      console.log(error);
      return { data: { message: "Wrooong!!" }, status: 500 };
    }
  },

  getAll: async (query, accountId) => {
    // console.log(query);
    try {
      const {
        limit,
        p,
        sortBy,
        sortType,
        slug,
        categorySlug,
        onlyParent,
        id,
        title,
      } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Posts.findAndCountAll({
        ...(pageSize > -1 ? { limit: pageSize } : {}),
        ...(offset > -1 ? { offset } : {}),
        where: {
          ...(slug ? { slug } : {}),
          ...(id ? { id: { [Op.ne]: id } } : {}),
          ...(title ? { title } : {}),
          ...(onlyParent ? { parentId: null } : {}),
          ...(categorySlug ? { "$category.slug$": categorySlug } : {}),
        },
        include: [
          {
            model: db.Category,
            as: "category",
          },
          {
            model: db.Account,
            as: "account",
          },
          {
            model: db.Posts,
            as: "parent",
          },
          {
            model: db.Posts,
            as: "children",
            include: [
              {
                model: db.Account,
                as: "account",
              },
            ],
          },
        ],
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
      const data = await db.Posts.findOne({
        where: { id },
        include: [
          {
            model: db.Category,
            as: "category",
          },
          {
            model: db.Account,
            as: "account",
          },
          {
            model: db.Posts,
            as: "children",
            include: [
              { model: db.Account, as: "account" },
              { model: db.Posts, as: "parent" },
            ],
          },
        ],
      });

      return { status: 200, data };
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
      const { limit, p, sortBy, sortType, q } = query;
      const pageSize = limit ? +limit : -1;
      const offset = pageSize !== -1 ? (+p - 1) * pageSize : -1;
      const { rows, count } = await db.Posts.findAndCountAll({
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
