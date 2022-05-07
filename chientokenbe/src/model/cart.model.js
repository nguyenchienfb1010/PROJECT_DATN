const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
    email: {type: String},
    cart: {type: Array}
})
module.exports = mongoose.model("Cart", Cart);
