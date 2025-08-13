const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://chandak227:vEmiDC5HSOEen08e@cluster0.akdvsu.mongodb.net/devTinder");
};

module.exports = connectDB;
