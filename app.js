const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const port = 8082;
mongoose.connect("mongodb://localhost:27017/data");

const app = express();


var mongoose = require('mongoose');

mongoose.promise = global.Promise;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});
var doggoImgSchema = new mongoose.Schema({
    type: String,
    data: Buffer
})
var DoggoImg = mongoose.model('DoggoImg', doggoImgSchema);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req, res) => res.send('e'));

app.get('/doggo', (req,res) =>  {
    DoggoImg.find({}, function(err, doggoImg) {
        res.send(doggoImg);
    })});
    
app.post('/doggo', (req, res) => {
    var img = req.body.img
        name = req.body.name
        //to be properly added to
    var nuDoggo = new DoggoImg({
        name: name,
        img: img
    });
    nuDoggo.save(function(err, doggo) {
        if(err) return console.error(err);
        console.log(doggo);
    })
})



app.listen(port, function() {
    console.log("server is running on ", port);
});