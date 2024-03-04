const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  currentRental: { type: Schema.Types.ObjectId, ref: "Rental" },
});

// model the collection

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
