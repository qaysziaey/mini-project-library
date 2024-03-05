const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    rentDuration: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model the collection

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

module.exports = Book;
