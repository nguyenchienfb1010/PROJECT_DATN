const { Router}  = require('express')
const authenticationRouter =require('../router/authuticate.router')
const userRouter = require('./user.router')
const courseRouter = require('./course.router')
const cartRouter = require('./cart.router')
const dataabse = require('../db')
const productRouter = require('./product.router')
const router = Router();
dataabse.connect();
router.use([
    authenticationRouter,
    userRouter,
    courseRouter,
    cartRouter,
    productRouter
])

module.exports = router;