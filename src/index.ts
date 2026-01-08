require("dotenv").config();
const { Client, Events, Collection } = require('discord.js');
const DiscordBot = new Client({ intents: 131071 });
const eventHandler = require('./Handler/EventHandler');
const commandHandler = require('./Handler/CommandHandler');

DiscordBot.Commands = new Collection();

eventHandler(DiscordBot);
commandHandler(DiscordBot);

DiscordBot.login(process.env.DISCORD_TOKEN);