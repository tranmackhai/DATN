const accountService = require("../services/account.service.js");

module.exports = {
  create: async (req, res, next) => {
    const { data, status } = await accountService.create();
    return res.status(status).json(data);
  },

  createAdmin: async (req, res, next) => {
    const { data, status } = await accountService.createAdmin();
    return res.status(status).json(data);
  },

  getAll: async (req, res, next) => {
    const { data, status } = await accountService.getAll(req.query);
    return res.status(status).json(data);
  },

  getById: async (req, res, next) => {
    const { data, status } = await accountService.getById(req.params.id);
    return res.status(status).json(data);
  },

  updateUser: async (req, res, next) => {
    const { data, status } = await accountService.updateUser(
      req.params.id,
      req.body
    );
    return res.status(status).json(data);
  },

  search: async (req, res, next) => {
    const { data, status } = await accountService.search(req.query);
    return res.status(status).json(data);
  },
};
