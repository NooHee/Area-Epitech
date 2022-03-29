const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


module.exports = function (app) {
    var admin = require("firebase-admin");
    const serviceAccount = require("./");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    let db = admin.firestore()

    getId = async (id) => {
        try {
            const data = await admin.auth().getUser(id);
            if (data.empty) {
                return -1;
            } else {
                return data;
            }
        } catch (error) {
            console.log('Unknown user ' + id);
            return -1;

        }

    }

    app.get("/check-user", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        if (req.query.name == undefined) {
            return res.status(200).json({ result: 'KO' });
        }
        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        var user = await db.collection('users').doc(info.uid).get()
        if (!user)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        if (!user.data()) {
            await db.collection("users").doc(info.uid).set({
                'displayName': req.query.name,
                'Widgets': [],
                'spotify': { key: '' },
                'reddit': { key: '' }
            });
            return res.json({
                result: 'OK'
            })

        }
        return res.json({
            result: 'KO'
        })
    })

    app.get("/check-auth", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.token == undefined || req.query.token == '') {
            return res.status(400).json({ result: 'KO', error: 'empty token' });
        }
        admin.auth().verifyIdToken(req.query.token).then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log(uid)
        }).catch((error) => {
            console.log(error)
        });
        return res.json({
            result: 'OK'
        })
    })

    app.get("/add-widget", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        if (req.query.widget == undefined || req.query.widget == '') {
            return res.status(400).json({ result: 'KO', error: 'empty widget' });
        }
        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        var user = await db.collection('users').doc(info.uid).get()
        if (!user)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        var widgets = user.data().Widgets
        if (user.data() && user.data().Widgets) {
            var widget = JSON.parse(req.query.widget);
            if (!widget.action || !widget.reaction || !widget.argsA || !widget.argsR) {
                return res.status(400).json({ result: 'KO', error: 'Wrong widget infos: Please provide an action and a reaction' });
            }
            widgets.push(widget);
            await db.collection("users").doc(info.uid).update({
                "Widgets": widgets
            });
            user = await db.collection('users').doc(info.uid).get()
            return res.json({
                result: 'OK'
            })
        }
        return res.json({
            result: 'KO'
        })
    })

    app.get("/get-widget", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        var user = await db.collection('users').doc(info.uid).get()
        if (!user)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        if (user.data() && user.data().Widgets) {
            return res.json({
                result: 'OK', widgets: user.data().Widgets
            })
        }
        return res.json({
            result: 'OK', widgets: []
        })
    })

    app.get("/delete-widget", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        if (req.query.id == undefined || req.query.id == '') {
            return res.status(400).json({ result: 'KO', error: 'empty id' });
        }
        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        var user = await db.collection('users').doc(info.uid).get()
        if (!user)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        var widgets = user.data().Widgets
        var filtered = widgets.filter(function (value, index) {
            if (index != req.query.id)
                return value
        });
        await db.collection("users").doc(info.uid).update({
            "Widgets": filtered
        });
        return res.json({
            result: 'OK', widgets: filtered
        })
    })

    app.get("/get-keys", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        var user = await db.collection('users').doc(info.uid).get()
        if (!user)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        if (!user.data())
            return res.status(500).json({ result: 'KO', error: 'error while fetching user infos' });
        var spotify = user.data().spotify
        var reddit = user.data().reddit

        return res.status(200).json({
            result: 'OK', spotify: spotify, reddit: reddit
        })
    })

    app.get("/set-key", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        if (req.query.service == undefined || req.query.service == '') {
            return res.status(400).json({ result: 'KO', error: 'empty service' });
        }
        if (req.query.key == undefined || req.query.key == '') {
            return res.status(400).json({ result: 'KO', error: 'empty key' });
        }

        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        if (req.query.service == 'spotify') {
            await db.collection("users").doc(info.uid).update({
                'spotify': { key: req.query.key }
            });
        }
        else if (req.query.service == 'reddit') {
            await db.collection("users").doc(info.uid).update({
                'reddit': { key: req.query.key }
            });
        }
        return res.json({
            result: 'OK'
        })
    })

    app.get("/clear-key", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.uid == undefined || req.query.uid == '') {
            return res.status(400).json({ result: 'KO', error: 'empty uid' });
        }
        if (req.query.service == undefined || req.query.service == '') {
            return res.status(400).json({ result: 'KO', error: 'empty service' });
        }

        var info = await getId(req.query.uid);
        if (info == -1)
            return res.status(500).json({ result: 'KO', error: 'error while fetching user uid' });
        if (req.query.service == 'spotify') {
            await db.collection("users").doc(info.uid).update({
                'spotify': { key: '' }
            });
        }
        else if (req.query.service == 'reddit') {
            await db.collection("users").doc(info.uid).update({
                'reddit': { key: '' }
            });
        }
        return res.json({
            result: 'OK'
        })
    })
}