const express = require("express");
const cors = require("cors");
const Book = require("../model/Book");
const User = require("../model/User");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new Book
const createBook = async (req, res) => {
  await connect();

  const {
    title,
    thumbnail,
    author,
    publishYear,
    rentDuration,
    availableCopies,
  } = req.body;
  try {
    if (
      !title ||
      !thumbnail ||
      !author ||
      !publishYear ||
      !rentDuration ||
      !availableCopies
    ) {
      return res.status(400).json({ message: "Book did not created" });
    }

    const newBook = {
      title,
      thumbnail,
      author,
      publishYear,
      rentDuration,
      availableCopies,
    };

    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Book did not created" });
  }
};

// Get All the Books
const getBooks = async (req, res) => {
  await connect();
  const books = await Book.find();
  // const books = await Book.find().populate("user");

  if (!books.length) {
    return res.json({ message: "There are no books." });
  }
  // return res.json(books);
  return res.json(books.map((book) => ({ ...book._doc, id: book._id })));
};

// Search Book by id
const getBookById = async (req, res) => {
  await connect();
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(404).send({ message: "Book not found" }).end();
  }
  try {
    const content = await Book.findById({ _id: bookId });
    if (!content) {
      return res.json({ message: "Note not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

// Delete a Book
const deleteBook = async (req, res) => {
  await connect();
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(404).send({ message: "Book not found" }).end();
  }
  try {
    const content = await Book.findByIdAndDelete({ _id: bookId });
    if (!content) {
      return res.json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Book not found" });
  }
  console.log(`Book with id ${bookId} is deleted.`);
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
};
