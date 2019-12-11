const Sequelize = require("sequelize");
const db2 = require("../config/db2");

module.exports = db2.sequelize.define(
  "login",
  {
    username: {
      type: Sequelize.STRING
    },
    success: {
      type: Sequelize.BOOLEAN
    },
    timestamp: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
