const db = require("../models");

module.exports = {
  create: () => {
    return { data: "test", status: 202 };
  },
  getAll: async () => {
    try {
      const data = await db.Account.findAll();
      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 500, data: { message: "Error data!!" } };
    }
  },
};
