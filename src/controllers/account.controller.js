const accountService = require("../services/account.service.js");

module.exports = {
  create: async (req, res, next) => {
    const { data, status } = await accountService.create();
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
    const { data, status } = await accountService.updateUser(req.params.id, req.body);
    return res.status(status).json(data);
  },
 
};
