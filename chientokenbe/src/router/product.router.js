const { Router } = require("express");
const { addProduct,getProduct } = require("../controller/product.controller");
const { authenticate} = require('../middleware/authuticate.middlerware')
const productRouter = Router();


productRouter.post('/product',authenticate,addProduct)
productRouter.get('/product',getProduct)


module.exports = productRouter