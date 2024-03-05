const express = require("express");
const cors = require("cors");
const User = require("../model/User");
const Book = require("../model/Book");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create New user
const createNewUser = async (req, res) => {
  await connect();
  const { name } = req.body;
  console.log(name);
  try {
    if (!name) {
      return res.status(400).json({ message: "User name not be created" });
    }

    const user = await User.create({ name });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(202).json({ error: "User cant be created." });
  }
};

// Get All the Users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  console.log(users);

  if (!users.length) {
    return res.status(204).send();
  }
  return res.json(users);
  // return res.json(users.map((user) => ({ ...user._doc, id: user._id })));
};

// Create a New User with Book
const createUserWithBook = async (req, res) => {
  await connect();
  const { user } = req.params;

  // const books = await Book.find().populate("users");
  // const user = await User.find({ name: user }).populate("book");

  // check user exists
  if (user) {
    let { _id: userId } = (await User.findOne({ name: user })) || {
      _id: null,
    };

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = req.body;

    // create new user if it doesnt exists
    if (userId && book) {
      const { _id: newUserId } = (await User.findByIdAndUpdate(userId, {
        $push: { book: { book } },
      })) || {
        _id: null,
      };
      return res.status(201).json({ user, id: newUserId });
    }
  }
  res.json({ message: "Could not create note, User not found" });
};

// Search User by name
const getUserByName = async (req, res) => {
  await connect();
  const { userName } = req.params;

  try {
    const content = await User.find({
      name: { $regex: userName, $options: "i" },
    });
    if (!content) {
      return res.json({ message: "Note not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

// Detelete a User
const deleteUser = async (req, res) => {
  await connect();
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send({ message: "User not found" }).end();
  }
  try {
    const content = await User.findByIdAndDelete({ _id: userId });
    if (!content) {
      return res.json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
  console.log(`User with id ${userId} is deleted.`);
};

// rent a book to a user
// const rentBook = async (req, res) => {
//   await connect();
//   const { userId, bookId } = req.params;
//   try {
//     const user = await User.findOne({ _id: userId });
//     const book = await Book.findOne({ _id: bookId });
//     if (!user || !book) {
//       return res.status(404).json({ message: "User or book not found" });
//     }
//     user.book.push(book);
//     book.users.push(user);
//     await user.save();
//     await book.save();
//     return res.status(200).json({ user, book });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }

//   // return res.json({ user, book });
// };

const rentBook = async (req, res) => {
  await connect();
  const { userId, bookId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    const book = await Book.findOne({ _id: bookId });
    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found" });
    }
    const userBook = user.book;
    if (userBook.includes(book)) {
      return res.status(400).json({ message: "Book already rented" });
    }
    const { _id: newUserId } = (await User.findByIdAndUpdate(userId, {
      $push: { book: { book } },
    })) || {
      _id: null,
    };
    const { _id: newBookId } = (await Book.findByIdAndUpdate(bookId, {
      $push: { users: { user } },
    })) || {
      _id: null,
    };
    return res.status(201).json({ user, id: newUserId, book, id: newBookId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // return res.json({ user, book });
};
module.exports = {
  createUserWithBook,
  getUserByName,
  createNewUser,
  getAllUsers,
  deleteUser,
  rentBook,
};
