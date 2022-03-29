const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/services/actions", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var services =
            [
                { name: "Time", label: "time", color: 0xff000000 },
                { name: "Weather", label: "weather", color: 0xffFFC15E },
                { name: "Twitch", label: "twitch", color: 0xff6441A4 },
                { name: "Spotify", label: "spotify", color: 0xff1DB954 },
                { name: "Reddit", label: "reddit", color: 0xffFF4500 },
            ]
        res.json({ services: services })
    })

    app.get("/actions/time", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var actions = [
            { id: 'T0', name: "Time reaching 0 mins", description: "Trigger whenever the actual time is on time (_:00)", color: 0xff000000, service: 'time_b' },
            { id: 'T1', name: "Time reaching 30 mins", description: "Trigger whenever the actual time reach half an hour (_:30)", color: 0xff000000, service: 'time_b' }
        ]
        res.json({ actions: actions })
    })

    app.get("/actions/weather", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var actions = [
            {
                id: 'W0', name: "Temperature higher than 20°C", description: "Trigger whenever the temperature of the city is higher than 20°C",
                args: [
                    { name: 'city name' }
                ], color: 0xffFFC15E, service: 'weather'
            },
        ]
        res.json({ actions: actions })
    })

    app.get("/actions/twitch", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var actions = [
            {
                id: 'TW0', name: "Is live", description: "Trigger whenever a streamer is live",
                args: [
                    { name: 'streamer name' }
                ], color: 0xff6441A4, service: 'twitch'
            },
            {
                id: 'TW1', name: "Streamed more than 1h", description: "Trigger whenever a streamer is streaming for more than an hour",
                args: [
                    { name: 'streamer name' }
                ], color: 0xff6441A4, service: 'twitch'
            },
            {
                id: 'TW2', name: "Top 100 streamers have more than 50K viewers", description: "Trigger whenever the top 100 streamers of a game have more than 50K viewers combined",
                args: [
                    { name: 'game name' }
                ], color: 0xff6441A4, service: 'twitch'
            },
        ]
        res.json({ actions: actions })
    })


    app.get("/actions/spotify", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var actions = [
            {
                id: 'S0', name: "Artist is popular?", description: "Trigger whenever an artist is more popular than 80%",
                args: [
                    { name: "Artist" }
                ], color: 0xff1DB954, service: 'spotify',
            },
            {
                id: 'S1', name: "Number of Followers?", description: "Trigger whenever an artist have more followers than 50000",
                args: [
                    { name: "Artist" }
                ], color: 0xff1DB954, service: 'spotify'
            },
        ]
        res.json({ actions: actions })
    })

    app.get("/actions/reddit", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var actions = [
            {
                id: 'R0', name: "Number of subreddit?", description: "Trigger whenever if you are reggister to more then 10 subreddit",
                color: 0xffFF4500, service: 'reddit',
            },
        ]
        res.json({ actions: actions })
    })
}