const express = require('express');
const converter = require('json-2-csv');
const request = require('request');

//Express Server Config
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const apiKey = "a0db47dd9741898dfa188f1e4ad6023d";

app.get('/', function (req, res) {

    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(lat+lon);

    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excude=minutely&appid=${apiKey}&units=metric`;

    request(url, function (err, response, body) {
        if (err) {
            res.sendStatus(500);
        } else {
            let weather = JSON.parse(body);
            converter.json2csv(weather, (err, csv) => {
                if (err) {
                    res.send('failed to convert to csv').status(500);
                }
                res.send(csv).status(200);
            });
        }
    });
});

var server = app.listen(5002, () => {
    console.log(`Server is running on port ${5002}.`);
});

module.exports = server;