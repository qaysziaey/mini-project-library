const express = require("express");
const cors = require("cors");
const User = require("../model/User");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get All the Users
const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users.length) {
    return res.status(204).send();
  }

  const sanitizedUsers = users.map((user) => {
    const { _id, ...sanitizedUser } = user._doc;
    return { ...sanitizedUser, id: _id };
  });

  return res.json(sanitizedUsers);
};

// Create a User
const createUser = async (req, res) => {
  await connect();
  const { user } = req.params;

  // check user exists
  if (user) {
    let { _id: userId } = (await User.findOne({ name: user })) || {
      _id: null,
    };

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(userId);
    const book = req.body;
    console.log(book);

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
module.exports = {
  getUsers,
  getUserByName,
  createUser,
};
