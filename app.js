require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./lib/connectDB");
const User = require("./model/User");

const {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
} = require("./controllers/bookController");
const {
  createUser,
  getUsers,
  getUserByName,
} = require("./controllers/userController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// Create a Book
app.post("/books", createBook);

// Get all the Books
app.get("/", getBooks);

// Search book by id
app.get("/:bookId", getBookById);

// Delete a Book
app.delete("/:bookId", deleteBook);

// Get all Users
app.get("/users/users", getUsers);

// Search user by name
app.get("/users/:userName", getUserByName);

// Check if the user exists and add the note
app.post("/users/books/:user", createUser);

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
