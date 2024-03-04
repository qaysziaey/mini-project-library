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
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
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
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});

// model the collection

const Books = mongoose.models.Books || mongoose.model("Books", BookSchema);

module.exports = Books;
