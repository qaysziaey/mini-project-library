require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Book = require("./model/Books");
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

// Search by id
app.get("/:noteId", async (req, res) => {
  await connect();
  const { noteId } = req.params;

  try {
    const content = await Book.find({ _id: noteId });
    if (!content) {
      return res.json({ message: "Note not found" });
    }

    res.json(content);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
});

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
