const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
  app.get("/services/reactions", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var services = [
      { name: "Discord", label: "discord", color: 0xff7289DA },
      { name: "Cocktail", label: "cocktail", color: 0xffBF4E30 },
    ]
    res.json({ services: services })
  })

  app.get("/reactions/discord", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var reactions = [
      {
        id: 'D0',
        name: "Write a message", description: "Create a message on a specific channel",
        oauth: 'https://discord.com/api/oauth2/authorize?client_id=939165648553144391&permissions=8&scope=bot',
        //https://discord.com/oauth2/authorize?client_id=939165648553144391&permissions=134160&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20bot%20guilds
        args: [
          { name: 'channel name' },
          { name: 'message' }
        ], color: 0xff7289DA, service: 'discord'
      },
      {
        id: 'D1',
        name: "Write a message for all", description: "Create a message on a specific channel on every server where the bot was invited",
        oauth: 'https://discord.com/api/oauth2/authorize?client_id=939165648553144391&permissions=8&scope=bot',
        //https://discord.com/oauth2/authorize?client_id=939165648553144391&permissions=134160&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20bot%20guilds
        args: [
          { name: 'channel name' },
          { name: 'message' }
        ], color: 0xff7289DA, service: 'discord'
      },
      {
        id: 'D2',
        name: "Create a channel", description: "Create a channel on a specific server",
        oauth: 'https://discord.com/api/oauth2/authorize?client_id=939165648553144391&permissions=8&scope=bot',
        //https://discord.com/oauth2/authorize?client_id=939165648553144391&permissions=134160&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20bot%20guilds
        args: [
          { name: 'server name' },
          { name: 'channel name' }
        ], color: 0xff7289DA, service: 'discord'
      },
      {
        id: 'D3',
        name: "Send private message", description: "Send a private message to a specific user",
        oauth: 'https://discord.com/api/oauth2/authorize?client_id=939165648553144391&permissions=8&scope=bot',
        //https://discord.com/oauth2/authorize?client_id=939165648553144391&permissions=134160&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fdiscord&response_type=code&scope=identify%20bot%20guilds
        args: [
          { name: 'user' },
          { name: 'message' }
        ], color: 0xff7289DA, service: 'discord'
      }
    ]
    res.json({ reactions: reactions })
  })

  app.get("/reactions/system", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var reactions = [
      {
        id: 'S0', name: "Alert", description: "Create a popup message"
      },
    ]
    res.json({ reactions: reactions })
  })

  app.get("/reactions/cocktail", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var reactions = [
      {
        id: 'C0', name: "Cocktail with alcohol", description: "Create a window with a suggested cocktail based on the chosen ingredient with alcohol",
        args: [
          { name: 'ingredient name' },
        ], color: 0xffBF4E30, service: 'cocktail'
      },
      {
        id: 'C1', name: "Cocktail without alcohol", description: "Create a window with a suggested cocktail based on the chosen ingredient without alcohol",
        args: [
          { name: 'ingredient name' },
        ], color: 0xffBF4E30, service: 'cocktail'
      },
    ]
    res.json({ reactions: reactions })
  })
}