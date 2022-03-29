const express = require('express')
var moment = require('moment')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
require('./actions')(app);
require('./reactions')(app);
require('./discord')(app);
require('./time')(app);
require('./weather')(app);
require('./cocktail')(app);
require('./twitch')(app);
require('./spotify')(app);
require('./firestore')(app);
require('./reddit')(app);
var router = express.Router()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const fetch = require('node-fetch')
require('dotenv').config();
var request = require('request');

const Port = 8081

app.use('/', router)

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);
router.use(allowCrossDomain);

app.get("/about.json", (req, res) => {
    res.json({
        client: {
            host: req.socket.remoteAddress
        },
        server: {
            current_time: moment().unix(),
            services: [{
                name: "Discord",
                reactions: [{
                    name: "Write a message",
                    description: "Create a message on a specific channel",
                    args: [
                        {name: 'channel name'},
                        {name: 'message'}
                    ],
                }, {
                    name: "Write a message for all",
                    description: "Create a message on a specific channel on every server where the bot was invited",
                    args: [
                        {name: 'channel name'},
                        {name: 'message'}
                    ],
                },
                    {
                        name: "Create a channel",
                        description: "Create a channel on a specific server",
                        args: [
                            {name: 'server name'},
                            {name: 'channel name'}
                        ],
                    }, {
                        name: "Send private message",
                        description: "Send a private message to a specific user",
                        args: [
                            {name: 'user'},
                            {name: 'message'}
                        ],
                    }
                ]
            }, {
                name: "Cocktail",
                reactions: [{
                    name: "Cocktail with alcohol",
                    description: "Create a window with a suggested cocktail based on the chosen ingredient with alcohol",
                    args: [
                        {name: 'ingredient name'},
                    ],
                }, {
                    name: "Cocktail without alcohol",
                    description: "Create a window with a suggested cocktail based on the chosen ingredient without alcohol",
                    args: [
                        {name: 'ingredient name'},
                    ],
                },
                ]
            },
                {
                    name: "Time",
                    actions: [{
                        name: "On time",
                        description: "Trigger whenever the actual time is on time (_:00)",
                    }, {
                        name: "Half time",
                        description: "Trigger whenever the actual time is half an hour (_:30)",
                    }]
                },
                {
                    name: "Weather",
                    actions: [{
                        name: "Temperature higher than 20°C",
                        description: "Trigger whenever the temperature of the city is higher than 20°C",
                        args: [
                            { name: 'city name' }
                        ]
                    }]
                },
                {
                    name: "Twitch",
                    actions: [{
                        name: "Is live",
                        description: "Trigger whenever a streamer is live",
                        args: [
                            { name: 'streamer name' }
                        ]
                    },
                        {
                            name: "Streamed more than 1h",
                            description: "Trigger whenever a streamer is streaming for more than an hour",
                            args: [
                                { name: 'streamer name' }
                            ]
                        },
                        {
                            name: "Top 100 streamers have more than 50K viewers",
                            description: "Trigger whenever the top 100 streamers of a game have more than 50K viewers combined",
                            args: [
                                { name: 'game name' }
                            ]
                        },
                    ]
                },
                {
                    name: "Spotify",
                    actions: [{
                        name: "Artist is popular?",
                        description: "Trigger whenever an artist is more popular than 80%",
                        args: [
                            { name: "Artist" }
                        ]
                    }, {
                        name: "Number of Followers?",
                        description: "Trigger whenever an artist have more followers than 50000",
                        args: [
                            { name: "Artist" }
                        ]
                    }]
                },
                {
                    name: "Reddit",
                    actions: [{
                        name: "Number of subreddit?",
                        description: "Trigger whenever if you are reggister to more then 10 subreddit",
                    },]
                },
            ]
        }
    })
})


app.get("/client.apk", (req, res) => {
    res.download('/APK/app-release.apk')
})

app.listen(Port, '0.0.0.0');
console.log(`Running on port ${Port}`);