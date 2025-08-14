const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_DB_SECRET);
};

module.exports = connectDB;
