require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Book = require("../model/Book");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  await connect();
  const books = await Book.find().populate("user", "name");
  if (!books.length) {
    return res.json({ message: "Notes not found" });
  }

  res.json(books);
});

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
