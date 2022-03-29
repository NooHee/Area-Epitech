module.exports = function (app) {
    const { Client, Intents } = require('discord.js');
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
    const config = require('../config.json')

    client.on('ready', () => {
        console.log('Discord client is ready')
    })

    client.on('message', () => {
    })

    client.login(config.token)

    app.get("/trigger/discord/message", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.message == undefined || req.query.message == '') {
            res.statusCode = 400;
            return res.status(400).json({ error: 'empty message' });
        }
        var ch = client.channels.cache.find(channel => channel.name === req.query.channel)
        if (ch != undefined && ch != '') {
            var result = await client.channels.fetch(ch.id);
            if (result && result.isText())
                result.send(req.query.message)
            return res.json({ result: 'OK', id: ch.id, name: ch.name });
        }
        else {
            res.statusCode = 404;
            return res.status(404).json({ result: 'KO', error: 'Unknown channel' });
        }
    })

    app.get("/trigger/discord/message-for-all", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var Guilds = client.guilds.cache.map(guild => guild.id);

        if (req.query.channel == undefined || req.query.channel == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty channel name' });
        }
        if (req.query.message == undefined || req.query.message == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty message' });
        }
        var found = false;
        Guilds.forEach(guild => {
            client.guilds.fetch(guild).then((v) => {
                var c = v.channels.cache.find(channel => channel.name === req.query.channel)
                if (c && c.isText) {
                    found = true
                    c.send(req.query.message)
                }
            });
        });
        if (found) {
            return res.json({ result: 'OK' })
        } else {
            return res.status(404).json({ result: 'OK', error: 'No matching channel'})
            
        }
    })

    app.get("/trigger/discord/create-channel", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var Guilds = client.guilds.cache.map(guild => guild.id);

        if (req.query.sname == undefined || req.query.sname == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty server name' });
        }
        if (req.query.channel == undefined || req.query.channel == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty channel' });
        }
        for (guild in Guilds) {
            s = await client.guilds.fetch(Guilds[guild])
            if (s.name === req.query.sname) {
                c = await s.channels.create(req.query.channel, { reason: 'Needed a cool new channel' })
                c.send('@everyone This is the newly created channel')
                return res.json({ result: 'OK' });
            }

        }
        return res.status(404).json({ result: 'KO', error: 'Unknown server' });
    })

    app.get("/trigger/discord/send-pm", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var Guilds = client.guilds.cache.map(guild => guild.id);

        if (req.query.user == undefined || req.query.user == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty user' });
        }
        if (req.query.message == undefined || req.query.message == '') {
            res.statusCode = 400;
            return res.status(400).json({ result: 'KO', error: 'empty message' });
        }
        for (guild in Guilds) {
            var g = await client.guilds.fetch(Guilds[guild])
            var s = await g.members.fetch();
            var found = false
            s.map(mbr => {
                if (mbr.user.username == req.query.user && !found) {
                    mbr.user.send(req.query.message)
                    found = true
                }
            })
            if (found)
                return res.json({ result: 'OK' });
            return res.status(404).json({ result: 'KO', error: 'Unknown user' });
        }
        return res.status(404).json({ result: 'KO', error: 'Unknown user' });
    })
}