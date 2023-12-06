const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/parking", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to the database!");
  } catch (err) {
    // Utilisez throw pour propager l'erreur à l'appelant
    console.error("Cannot connect to the database!", err);
    throw err;
  }
};

module.exports = connectDB;
