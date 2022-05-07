const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String },
  password: { type: String },
  contractAdd: {type: String},
  avatar: { type: String },
  verifyToken: { type: String },
  verifyEmail: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String },
  phoneNumber: { type: String },
  isDoctor: {type: Boolean},
  address: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);
