var mongoose = require('mongoose')
//var bcrypt= require('bcrypt-nodejs')

/* var userSchema = new mongoose.Schema({
    productName: String,
    description: String,
    date: Date,
    startPrice:number,
    img: Image

})

    userSchema.pre('save', function (next) {
        var product = this

        if(!product.isModified('productName'))
            return next()

        
    }) */

    module.exports = mongoose.model('Product',{
        productName:String,
        discription :String,
        startPrice: Number,
        minAddPrice: Number,
        startDate: Date
    })