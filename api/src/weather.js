const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
const fetch = require('node-fetch')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/action/weather/higher-than-20", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        //5f4a29ea12a82edf0c05c286e3055f41
        //http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=5f4a29ea12a82edf0c05c286e3055f41
        
        /* if (req.query.key == undefined || req.query.key == '') {
            return res.status(401).json({ result: 'KO', error: 'Wrong or empty api key' });
        } */
        if (req.query.city == undefined || req.query.city == '') {
            return res.status(400).json({ result: 'KO', error: 'empty city name' });
        }
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=5f4a29ea12a82edf0c05c286e3055f41`).then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    if (data.cod == 404) {
                        return res.status(404).json({ result: 'KO', error: 'No matching city' });
                    }   
                }
                if (data.main.temp < 20)
                    return res.json({ result: 'KO', error: data.main.temp });
                else
                    return res.json({ result: 'OK', temp: data.main.temp });
            })
    })
}