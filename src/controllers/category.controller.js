const categoryService = require("../services/category.service.js");

module.exports = {
  create: async (req, res, next) => {
    const { data, status } = await categoryService.create(req.body);
    return res.status(status).json(data);
  },

  getAll: async (req, res, next) => {
    const { data, status } = await categoryService.getAll(req.query);
    return res.status(status).json(data);
  },

  update: async (req, res, next) => {
    const { data, status } = await categoryService.updateStatus(
      req.params.slug
    );
    return res.status(status).json(data);
  },

  delete: async (req, res, next) => {
    const { data, status } = await categoryService.delete(+req.params.id);
    return res.status(status).json(data);
  },

  getByUser: async (req, res, next) => {
    const { data, status } = await categoryService.getByUser(
      req.user.id,
      req.query
    );
    return res.status(status).json(data);
  },

  search: async (req, res, next) => {
    const { data, status } = await categoryService.search(req.query);
    return res.status(status).json(data);
  },
};
