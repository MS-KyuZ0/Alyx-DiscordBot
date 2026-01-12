require("dotenv").config();
import { REST, Routes } from 'discord.js';
import { clientID } from '../../config.json'
import * as fs from 'fs';
import * as path from 'node:path';

const commandHandler = (DiscordBot: any) => {
    const isCommands: string | any[] = [];
    const folderPath = path.join(__dirname, '../Commands');
    const commandFolders = fs.readdirSync(folderPath);

    for (const folder of commandFolders) {
        const commandPath = path.join(folderPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter(f => f.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                DiscordBot.Commands.set(command.data.name, command);
                isCommands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

    (async () => {
        try {
            console.log(`[System Command] Started refreshing ${isCommands.length} application (/) commands.`);

            const isData = await rest.put(Routes.applicationCommands(clientID), { body: isCommands }) as unknown[];

            console.log(`[System Command] Successfully reloaded ${isData.length} application (/) commands.`);
        } catch (err) {
            console.error(err);
        }
    })()
};

module.exports = commandHandler