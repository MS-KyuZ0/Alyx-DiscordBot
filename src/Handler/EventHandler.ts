import * as fs from 'fs'
import * as path from 'node:path'

const eventHandler = (DiscordBot: any) => {
    const eventFolder = path.join(__dirname, '../Events');
    const eventFiles = fs.readdirSync(eventFolder).filter(f => f.endsWith('.js'));

    for (const file of eventFiles) {
        const getFile = path.join(eventFolder, file);
        const event = require(getFile);

        try {
            console.log(`[System Handlers] Event ${event.name} ✅`)

            if (event.once) {
                DiscordBot.once(event.name, (...args: any) => event.execute(DiscordBot, ...args));
            } else {
                DiscordBot.on(event.name, (...args: any) => event.execute(DiscordBot, ...args));
            };
        } catch (err) {
            console.log(err)
        }
    };
};

module.exports = eventHandler