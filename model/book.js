const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// model the collection

const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);

module.exports = Book;
