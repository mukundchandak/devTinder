const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = async () => {
    console.log(process.env.MONGO_DB_SECRET)
    await mongoose.connect(process.env.MONGO_DB_SECRET);
};

module.exports = connectDB;
