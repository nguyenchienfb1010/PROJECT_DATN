const userSchema = require("../model/user.model");
const courseChema = require("../model/course.model");
const CartSchema = require("../model/cart.model");
async function addToCart(req, res) {
  try {
    const course = await courseChema
      .findOne({
        _id: req.body._id,
      })
      .exec();
    const email = await userSchema
      .findOne({
        email: req.user.email,
      })
      .exec();
    if (!course) {
      return res
        .status(400)
        .json({ message: "khong tim thay khoa hoc nao ca" });
    }

    if (email === undefined) {
      return res.status(400).json({ message: "user is invalid" });
    }
    console.log(email)
    const cart = await CartSchema.findOne({
      email: email.email,
    }).exec();
    if (cart) {
      const newCart1 = cart.cart.push(course)
      console.log("1",newCart1)
      const newCart = {
        ...cart,
        cart: newCart1,
      };
      console.log("2",newCart)
      await CartSchema(newCart).save();
      return res.status(200).json(newCart);
    }
    let arrCart = [];
    const newCart = {
      email: email.email,
      cart: [course],
    };
    console.log('3',newCart)
    await CartSchema(newCart).save();
    return res.status(200).json(newCart);
  } catch (error) {
    console.log(error);
  }
}

async function getCart(req,res){
  try {
    const cart = await CartSchema.findOne({
      email: req.user.email
    }).exec();
    if(!cart){
      return res.status(400).json({
        message: 'khong tim thay cart nao'
      })
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(400).json({
      message: ''
    })
  }
}

module.exports = {
  addToCart,
  getCart
};
