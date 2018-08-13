const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoURL = require('./mongoURL.js');

const port = 8082;
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {


})
    var doggoImgSchema = new mongoose.Schema({
        link: String,
        date: { type: Date, default: Date.now },
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
app.get('/doggo', (req,res) => {
    DoggoImg.find({}, function(err, doggoImg) {
        res.send(doggoImg);
    })
})
app.post('/doggo', (req, res) => {
    var link = req.body.link;
    
    var nuDoggo = new DoggoImg({
        link: link,
        date: Date(now),
        
    });
    nuDoggo.save(function(err, doggo) {
        if(err) return console.error(err);
        console.log(doggo);
    });
})
app.put('/doggo', function(req, res) {
    DoggoImg.findById(req.params.id, function(err, p) {
        if(!p) {
            return next(new Error('could not load document'));
        }
        else {
            p.meta.votes += 1;
            
            p.save(function(err) {
                if(err) {
                    console.log('error');
                }
                else {
                    console.log('success');
                }
            });
        }
    })
});
/*
app.get('/user', (req, res) => {
    User.findOne({'email': req.body.email}, function(err, user));
})
*/

app.listen(port, function() {
    console.log('server is running on port' + port);
});