//used to keep the heroku app running at all times


var schedule = require('node-schedule');
var fetch = require('node-fetch');
var herokuURL = require('./herokuURL');

schedule.scheduleJob('*/20 * * * *', () => {
     fetch(herokuURL, {mode: "cors"})
    .then(res => res.json())
    .then(json => console.log(json));  
});