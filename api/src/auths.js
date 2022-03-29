const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    /* app.get("/auth/discord", (req, res) => {
    }) */
}