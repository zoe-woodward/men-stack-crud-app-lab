const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    comments: String,
    recommend: Boolean,
  });

const Book = mongoose.model("Book", bookSchema); 

module.exports = Book;