require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Book = require("./model/Books");
const User = require("./model/Users");
const connect = require("./lib/connectDB");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/", async (req, res) => {
  await connect();

  const books = await Book.find().populate("user", "name");

  if (!books.length) {
    return res.json({ message: "Notes not found" });
  }

  res.json(books);
});

// Search Book by id
app.get("/:bookId", async (req, res) => {
  await connect();
  const { bookId } = req.params;

  try {
    const content = await Book.find({ _id: bookId });
    if (!content) {
      return res.json({ message: "Note not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

// Search by name
app.get("/user/:userName", async (req, res) => {
  await connect();
  const { userName } = req.params;
  console.log(userName);
  try {
    const content = await User.find({ name: userName });
    if (!content) {
      return res.json({ message: "Note not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

// Get all the Books rented by specific User

app.get("/user/:userId/books", async (req, res) => {
  await connect();
  const { userId } = req.params;
  const books = await Book.find({ user: userId });
  if (!books) {
    return res.json({ message: "Books not found" });
  }
  res.json(books);
});

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
