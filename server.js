const dotenv = require("dotenv"); // require package
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const methodOverride = require("method-override"); 
const morgan = require("morgan");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Book = require("./models/book.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev"));



app.get("/", async (req, res) => {
res.render("index.ejs");
});


app.get("/books", async (req, res) => {
    const allBooks = await Book.find();
    console.log(Book.recommend);
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
    if (req.body.recommend === "on") {
        req.body.recommend  = true;
      } else {
        req.body.recommend  = false;
      }
      await Book.create(req.body);
      res.redirect("/books");
    });

app.delete("/books/:bookId", async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
  res.redirect("/books");
    });

app.get("/books/:bookId/edit", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render("books/edit.ejs", {
        book: foundBook,
      });
    });

app.put("/books/:bookId", async (req, res) => {
    if (req.body.recommend === "on") {
    req.body.recommend = true;
    } else {
    req.body.recommend = false;
    }
    await Book.findByIdAndUpdate(req.params.bookId, req.body);
    res.redirect(`/books/${req.params.bookId}`);
    });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});