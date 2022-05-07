const mongoose = require('mongoose');
async function connect (){
    try {
        await mongoose.connect('mongodb+srv://chien:Fabong1010@cluster0.ji3oo.mongodb.net/DoAnTotNghiep', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true    
    });
    console.log("oke");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    connect
}