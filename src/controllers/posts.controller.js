const postsService = require("../services/posts.service.js");

module.exports = {
  create: async (req, res, next) => {
    const { data, status } = await postsService.create(req.body, req.user.id);
    return res.status(status).json(data);
  },
  getAll: async (req, res, next) => {
    const { data, status } = await postsService.getAll(req.query, req.user.id);
    // console.log(req.query);
    return res.status(status).json(data);
  },
  getById: async (req, res, next) => {
    const { data, status } = await postsService.getById(req.params.id);
    return res.status(status).json(data);
  },
};
