const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoURL = require('./mongoURL');

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
    var DoggoImg = mongoose.model('DoggoImg', doggoImgSchema);
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

app.listen(port, function() {
    console.log('server is running on port' + port);
});