const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
const fetch = require('node-fetch')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/action/reddit/nb-sub", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (req.query.key == undefined || req.query.key == '') {
            return res.status(400).json({ result: 'KO', error: 'empty api key' });
        }

        fetch(`https://oauth.reddit.com/subreddits/mine/subscriber`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + req.query.key
            }
        }
        
        ).then((response) => response.json())
        .then((data) => {
                if (data) {
                    if (data.data.dist == 0)
                        return res.status(404).json({ result: 'KO', error: 'No subreddit subscribe' })
                    if (data.data.dist >= 10)
                        return res.status(200).json({ result: 'OK', subreddits: data.data.dist })
                    return res.status(200).json({ result: 'KO', error: 'Not enougth subreddits' })
                }
                return res.status(401).json({ result: 'KO', error: 'Wrong Reddit api key, please sign out/sign in to Reddit.'})
            })
    })
}