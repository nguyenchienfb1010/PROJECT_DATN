const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  email: {type: String},
  Price: {type: Number},
  title: {type: String},
  img: {type: String},
  isBuyProduct: {type: Boolean},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// TODO add them lesson {
  // doc
  // video
// }

module.exports = mongoose.model("Product", Product);