const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    summary: String,
    score: Number
  });

const Book = mongoose.model("Book", bookSchema); 

module.exports = Book;