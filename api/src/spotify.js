const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
const fetch = require('node-fetch');
const { response } = require('express');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/action/spotify/is-popular", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.artist == undefined || req.query.artist == '') {
            return res.status(400).json({ result: 'KO', error: 'empty artist name' });
        }
        if (req.query.key == undefined || req.query.key == '') {
            return res.status(400).json({ result: 'KO', error: 'empty api key' });
        }
        fetch(`https://api.spotify.com/v1/search?type=artist&q=${req.query.artist}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + req.query.key
            }
        }
        ).then((response) => response.json())
            .then((data) => {
                if (data.artists && data.artists.items) {
                    if (data.artists.items.length == 0)
                        return res.status(404).json({ result: 'KO', error: 'No artist matching for this name' })
                    var id = 0
                    for (artist in data.artists.items) {
                        if (data.artists.items[artist].name.toLowerCase() == req.query.artist.toLowerCase()) {
                            id = data.artists.items[artist].id;
                        }
                    }
                    if (id == 0)
                        return res.status(404).json({ result: 'KO', error: 'No artist matching for this name' })
                    fetch(`https://api.spotify.com/v1/artists/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + req.query.key
                        }
                    }).then((response) => response.json())
                        .then((data) => {
                            if (data) {
                                if (data.popularity >= 80)
                                    return res.status(200).json({ result: 'OK', popularity: data.popularity })
                                return res.status(200).json({ result: 'KO', error: 'Not that popular' })
                            }
                            else
                                return res.status(401).json({ result: 'KO', error: 'Wrong Spotify api key, please sign out/sign in to Spotify.'})
                        })
                }
            })

    })

    app.get("/action/spotify/follower-50k", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        if (req.query.artist == undefined || req.query.artist == '') {
            return res.status(400).json({ result: 'KO', error: 'empty artist name' });
        }
        if (req.query.key == undefined || req.query.key == '') {
            return res.status(400).json({ result: 'KO', error: 'empty api key' });
        }
        fetch(`https://api.spotify.com/v1/search?type=artist&q=${req.query.artist}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + req.query.key
            }
        }
        ).then((response) => response.json())
            .then((data) => {
                if (data.artists && data.artists.items) {
                    if (data.artists.items.length == 0)
                        return res.status(404).json({ result: 'KO', error: 'No artist matching for this name' })
                    var id = 0
                    for (artist in data.artists.items) {
                        if (data.artists.items[artist].name.toLowerCase() == req.query.artist.toLowerCase()) {
                            id = data.artists.items[artist].id;
                        }
                    }
                    if (id == 0)
                        return res.status(404).json({ result: 'KO', error: 'No artist matching for this name' })
                    fetch(`https://api.spotify.com/v1/artists/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + req.query.key
                        }
                    }).then((response) => response.json())
                        .then((data) => {
                            if (data) {
                                if (data.followers.total >= 50000) {
                                    return res.status(200).json({ result: 'OK', total: data.followers.total })
                                }
                                return res.status(200).json({ result: 'KO', error: 'Not that popular' })
                            }
                            else
                                return res.status(401).json({ result: 'KO', error: 'Wrong Spotify api key, please sign out/sign in to Spotify.'})
                        })
                }
            })
    })
}