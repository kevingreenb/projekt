const Sequelize = require("sequelize");
const db2 = {};
const sequelize = new Sequelize("projekt", "admin123", "admin123", {
  host: "database-1.ccvs4rjpygzb.us-east-2.rds.amazonaws.com",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db2.sequelize = sequelize;
db2.Sequelize = Sequelize;

module.exports = db2;
