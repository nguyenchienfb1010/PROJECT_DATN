const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  coach_Name: {
    type: String,
  },
  price: {
      type: String
  },
  des: {
      type: String
  },
  img: {
      type: String
  },
  category: {
      type: String
  },
  lession: {
    type: Array
  },
  time: {
    type: Date, default: Date.now
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// TODO add them lesson {
  // doc
  // video
// }

module.exports = mongoose.model("Course", Course);