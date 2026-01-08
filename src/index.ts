require("dotenv").config();
const {Client, Events} = require('discord.js');
const DiscordBot = new Client({intents: 131071});
const eventHandler = require('./Handler/EventHandler')

eventHandler(DiscordBot)

DiscordBot.login(process.env.DISCORD_TOKEN);