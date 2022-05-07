const productSchema = require("../model/product.model");

async function addProduct(req,res){
    try {
        const product = {
            email: req.user.email,
            Price: req.body.price,
            title: req.body.title,
            img: 'https://cdn.tgdd.vn/Files/2021/03/04/1332588/cach-tu-dong-thay-hinh-nen-iphone-moi-ngay_800x450.jpg',
            isBuyProduct: false
        }
        const newProduct = productSchema(product)
        await newProduct.save()
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({
            message: 'error when add product'
        })
    }
}

async function getProduct(req,res){
    try {
    const product = await productSchema.find().exec();
    return res.status(200).json(product)
        
    } catch (error) {
        return res.status(400).json({
            message: 'error when get product'
        })
    }
}
module.exports = {
    addProduct,
    getProduct
}