const dotenv = require("dotenv"); // require package
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Book = require("./models/book.js");
app.use(express.urlencoded({ extended: false }));



app.get("/", async (req, res) => {
res.render("index.ejs");
});


app.get("/books", async (req, res) => {
    const allBooks = await Book.find();
    console.log(allBooks);
    res.render("books/index.ejs", { books: allBooks });
  });
  
  
app.get("/books/new", (req, res) => {
res.render("books/new.ejs");
});

app.get("/books/:bookId", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render("books/show.ejs", { book: foundBook });
  });
  

app.post("/books", async (req, res) => {
    if (req.body.reccomend === "on") {
        req.body.reccomend  = true;
      } else {
        req.body.reccomend  = false;
      }
      await Book.create(req.body);
      res.redirect("/books");
    });



app.listen(3000, () => {
  console.log("Listening on port 3000");
});