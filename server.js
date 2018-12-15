var express = require('express')
var app = express()
var cors = require('cors')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')

var Post = require('./models/Post.js')
var User = require('./models/User.js')
var auth = require('./auth.js')
var jwt = require('jwt-simple')

mongoose.Promise = Promise



app.use(cors())
app.use(bodyparser.json())


function checkAuthenticated(req,res,next){
    if(!req.header('authorization'))
        return res.status(401).send({message: 'Unauthorized. Missing Auth Header'})

    var token = req.header('authorization').split(' ')[1]

    var payload = jwt.decode(token, '123')

    if(!payload)
        return res.status(401).send({message: 'Unauthorized. Auth Header Invalid'})

    req.userId = payload.sub

    next()
}

app.get('/posts/:id', async(req, res) => {
    var author = req.params.id
    var posts = await Post.find({author})
    res.send(posts)
})

app.post('/post', auth.checkAuthenticated , (req,res) => {
    var postData = req.body
    postData.author = req.userId

    var post = new Post(postData)
    post.save((err, result) => {
        if (err){
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }
        res.sendStatus(200)
    })
})

app.get('/users',async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
 
})



mongoose.connect('mongodb://test:ftest1@ds159631.mlab.com:59631/ftest', { useMongoClint: true }, (err) => {
    if (!err)
        console.log('connected to mongo')
})

app.use('/auth',auth.router)
app.listen(3000)

app.post('/sell', (req,res) => {
    var productData= req.body;
    var product = new Product(productData)
    product.save((err,result)=>{
        if(err)
            console.log('saving product error')

        res.sendStatus(200)
    })
    
})