const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  rentDuration: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// model the collection

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

module.exports = Book;
