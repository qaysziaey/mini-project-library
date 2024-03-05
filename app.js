require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Book = require("./model/Book");
const User = require("./model/User");
const connect = require("./lib/connectDB");
const mongoose = require("mongoose");
const {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
} = require("./controllers/bookController");
const { getUsers, getUserByName } = require("./controllers/userController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// Get all the Books
app.get("/", getBooks);

// Search book by id
app.get("/:bookId", getBookById);

// Delete a Book
app.delete("/:bookId", deleteBook);

// Get all the Users
app.get("/users", getUsers);

// Search user by name
app.get("/user/:userName", getUserByName);

app.post("/", createBook);

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
