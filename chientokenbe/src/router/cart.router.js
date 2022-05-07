const { Router } = require('express')
const { authenticate} = require('../middleware/authuticate.middlerware')
const { addToCart,getCart } = require('../controller/cart.controller')
const cartRouter = Router()
cartRouter.post('/cart',authenticate,addToCart)
cartRouter.get('/carts',authenticate,getCart)



module.exports = cartRouter