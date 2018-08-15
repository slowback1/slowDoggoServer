const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


const port = (process.env.PORT || 8082);
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {


})
    var doggoImgSchema = new mongoose.Schema({
        link: String,

        date: { type: Date, default: new Date().toISOString() },
        meta: {
            votes: { type: Number, default: 0 }
        }
    })
    var userSchema = new mongoose.Schema({
        email: String,
        username: String,
        date: Date,
        accessLevel: String,
        password: String,
    });
    
    var DoggoImg = mongoose.model('DoggoImg', doggoImgSchema);
    var User = mongoose.model('User', userSchema);
    
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.options('/doggo', (req, res) => {
    console.log("e");
    res.send("e");
})
app.get('/doggo', (req,res) => {
    DoggoImg.find({}, function(err, doggoImg) {
        res.send(doggoImg);
    })
})
app.post('/doggo', (req, res) => {
    var link = req.body.link;
    console.log(req.body);
    var nuDoggo = new DoggoImg({
        link: link,

        
    });
    nuDoggo.save(function(err, doggo) {
        if(err) return console.error(err);
        res.send("saved! " + doggo);
    });
})
app.put('/doggo', function(req, res) {
    DoggoImg.findOneAndUpdate({_id: req.body.id}, {$set:{meta: {votes: meta.votes+1}}}, {new: true}, function(err, doc) {
        if(err){
            console.log("something went wrong with updating");
        }
        console.log(doc);
    });
});
/*
app.get('/user', (req, res) => {
    User.findOne({'email': req.body.email}, function(err, user));
})
*/

app.listen(port, function() {
    console.log('server is running on port' + port);
});