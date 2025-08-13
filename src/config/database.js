const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://chandak227:${process.env.MONGO_DB_PASSWORD}@cluster0.akdvsu.mongodb.net/devTinder`);
};

module.exports = connectDB;
