const Sequelize = require("sequelize");
const db2 = require("../config/db2");

module.exports = db2.sequelize.define(
  "deletion",
  {
    username: {
      type: Sequelize.STRING
    },
    projectTitle: {
      type: Sequelize.STRING
    },
    deliveryDate: {
      type: Sequelize.STRING
    },
    timestamp: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
