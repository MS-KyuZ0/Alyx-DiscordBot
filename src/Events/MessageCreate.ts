import { Events, MessageFlags } from 'discord.js'

module.exports = {
    name: Events.MessageCreate,
    async execute(DiscordBot: any, message: any) {
        if (!message || message.author.bot) return;

        console.log(message)
    },
}