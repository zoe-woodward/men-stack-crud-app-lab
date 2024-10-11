const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    comments: String,
    reccommend: Boolean,
  });

const Book = mongoose.model("Book", bookSchema); 

module.exports = Book;