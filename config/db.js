const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("dbUri"));
    console.log("Connected to database!");
  } catch (err) {
    console.log("Connection failed!", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
