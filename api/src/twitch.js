//0tqrlwzhdtnox0k7dlrzu68amwec8x twitch c
//7tsts13hhuuinu7uac073mzjvelqnf twitch s
//v7tcq8xzom1qzhyin9x3bfd2sgx73g twitch t

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
const fetch = require('node-fetch')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/action/twitch/is-live", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.streamer_name == undefined || req.query.streamer_name == '') {
            return res.status(400).json({ result: 'KO', error: 'empty streamer name' });
        }
        fetch(`https://api.twitch.tv/helix/search/channels?query=${req.query.streamer_name}`, {
            method: 'GET',
            headers: {
                'Client-Id': '0tqrlwzhdtnox0k7dlrzu68amwec8x',
                'Authorization': 'Bearer ' + 'cs1q9m08e1b8gtoup3zpsgpd4bwgcc'
            }
        }).then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    if (data.data.length == 0)
                        return res.status(404).json({ result: 'KO', error: 'No streamer matching this name' })
                    for (channel in data.data) {
                        if (data.data[channel].display_name.toLowerCase() == req.query.streamer_name.toLowerCase() && data.data[channel].is_live)
                            return res.status(200).json({ result: 'OK', name: data.data[channel].display_name, is_live: data.data[channel].is_live })
                    };
                    return res.status(200).json({ result: 'KO', error: 'Not streaming yet' })
                }
            })
    })

    app.get("/action/twitch/stream-1h", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.streamer_name == undefined || req.query.streamer_name == '') {
            return res.status(400).json({ result: 'KO', error: 'empty streamer name' });
        }
        fetch(`https://api.twitch.tv/helix/search/channels?query=${req.query.streamer_name}&is_live=true`, {
            method: 'GET',
            headers: {
                'Client-Id': '0tqrlwzhdtnox0k7dlrzu68amwec8x',
                'Authorization': 'Bearer ' + 'cs1q9m08e1b8gtoup3zpsgpd4bwgcc'
            }
        }).then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    if (data.data.length == 0)
                        return res.status(404).json({ result: 'KO', error: 'Not streamer matching this name' })
                    for (channel in data.data) {
                        if (data.data[channel].display_name.toLowerCase()  == req.query.streamer_name.toLowerCase()  && data.data[channel].is_live) {
                            var now = new Date().getTime();
                            var started = new Date(data.data[channel].started_at).getTime();

                            if (now - 3600000 > started + 3600000)
                                return res.status(200).json({ result: 'OK' })
                            else
                                return res.status(200).json({ result: 'KO', error: 'The stream is shorter than 1 hour' })
                        }
                    };
                    return res.status(200).json({ result: 'KO', error: 'Not streaming yet' })
                }
            })
    })

    app.get("/action/twitch/top-100", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.game == undefined || req.query.game == '') {
            return res.status(400).json({ result: 'KO', error: 'empty game name' });
        }
        fetch(`https://api.twitch.tv/helix/games?name=${req.query.game}`, {
            method: 'GET',
            headers: {
                'Client-Id': '0tqrlwzhdtnox0k7dlrzu68amwec8x',
                'Authorization': 'Bearer ' + 'cs1q9m08e1b8gtoup3zpsgpd4bwgcc'
            }
        }).then((response) => response.json())
            .then((data) => {
                if (data.data) {
                    if (data.data.length == 0)
                        return res.status(404).json({ result: 'KO', error: 'No game matching this name' })
                    var game = data.data[0]
                    var id = game.id
                    fetch(`https://api.twitch.tv/helix/streams?game_id=${id}&first=100`, {
                        method: 'GET',
                        headers: {
                            'Client-Id': '0tqrlwzhdtnox0k7dlrzu68amwec8x',
                            'Authorization': 'Bearer ' + 'cs1q9m08e1b8gtoup3zpsgpd4bwgcc'
                        }
                    }).then((response) => response.json())
                        .then((data) => {
                            if (data.data) {
                                var nb = 0
                                for (game in data.data) {
                                    nb += data.data[game].viewer_count
                                }
                                if (nb >= 50000)
                                    return res.status(200).json({ result: 'OK', nb: nb })
                                return res.status(200).json({ result: 'KO', error: 'Too few viewers' })
                            }
                        })
                }
            })
    })
}
