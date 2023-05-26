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
};
