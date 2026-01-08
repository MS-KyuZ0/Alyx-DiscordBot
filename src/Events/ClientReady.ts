import { Events } from 'discord.js'

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(DiscordBot: any) {
        console.log(`[System] Logged in as ${DiscordBot.user.tag}`);
    },
}