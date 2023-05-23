const accountService = require("../services/account.service.js");

module.exports  = {
  create: async (req, res, next) => {
    const { data, status } = await accountService.create();
    return res.status(status).json(data);
  },
  getAll: async (req, res, next) => {
    const { data, status } = await accountService.getAll();
    return res.status(status).json(data);
  },
};
