const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongo_uri);
    if (connection) {
      console.log(`Connected to database successfully!`);
    }
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = { connectDB };