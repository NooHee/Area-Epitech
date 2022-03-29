const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/action/time/on-time", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var now = new Date();
        var mins = now.getMinutes();
        if (mins == 0)
            return res.json({result: 'OK'});
        return res.json({result: 'KO', error: 'Not 00 min yet'});
    })

    app.get("/action/time/half-time", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var now = new Date();
        var mins = now.getMinutes();
        if (mins == 30)
            return res.json({result: 'OK'});
        return res.json({result: 'KO', error: 'Not 30 min yet'});
    })
}