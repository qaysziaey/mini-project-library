const express = require("express");
const Book = require("../model/Book");
const User = require("../model/User");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get All the Users
const getUsers = async (req, res) => {
  await connect();

  const users = await User.find();

  if (!users.length) {
    return res.json({ message: "There are no users." });
  }

  // return res.json(users);
  return res.json(users.map((user) => ({ ...user._doc, id: user._id })));
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
};
