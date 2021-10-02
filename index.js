const express = require('express');
const request = require('request');
const db = require('./initDB');


//Express Server Config
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const apiKey = "a0db47dd9741898dfa188f1e4ad6023d";

app.get('/', function (req, res) {

    const lat = req.query.lat;
    const lon = req.query.lon;
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();
    var today = new Date(currentTime.getTime() + (330 + currentOffset) * 60000);

    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excude=minutely&appid=${apiKey}&units=metric`;

    request(url, function (err, response, body) {
        if (err) {
            res.sendStatus(500);
        } else {
            let weather = JSON.parse(body);
            db.collection('weather-api-data').insertOne(weather);
            db.collection('weather-api-logs').insertOne({ 'date': today, 'lat': lat, 'lon': lon, 'ip': ip });
            res.send(weather).status(200);
        }
    });
});

var PORT = process.env.PORT || 5002;
var server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;