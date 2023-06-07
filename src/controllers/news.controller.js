const newsService = require("../services/news.service.js");

module.exports = {
  create: async (req, res, next) => {
    const { data, status } = await newsService.create(req.body);
    return res.status(status).json(data);
  },

  getAll: async (req, res, next) => {
    const { data, status } = await newsService.getAll(req.query);
    return res.status(status).json(data);
  },

  updateStatus: async (req, res, next) => {
    const { data, status } = await newsService.updateStatus(req.params.slug);
    return res.status(status).json(data);
  },

  delete: async (req, res, next) => {
    const { data, status } = await newsService.delete(+req.params.id);
    return res.status(status).json(data);
  },

  getByUser: async (req, res, next) => {
    const { data, status } = await newsService.getByUser(
      req.user.id,
      req.query
    );
    return res.status(status).json(data);
  },

  search: async (req, res, next) => {
    const { data, status } = await newsService.search(req.query);
    return res.status(status).json(data);
  },
};
