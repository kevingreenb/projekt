const mongoose = require("mongoose");
const config = require("config");
const connection = config.get("mongoURI");

const mongoConnection = async () => {
  try {
    await mongoose.connect(connection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error("Error connecting to DB :" + error.message);
    process.exit(1);
  }
};

module.exports = mongoConnection;
