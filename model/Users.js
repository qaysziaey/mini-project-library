const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  currentRental: { type: Schema.Types.ObjectId, ref: "Books" },
});

// model the collection

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

module.exports = Users;
