import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test bot respons.'),
    async execute(interaction: { reply: (arg0: string) => any; user: { username: any; }; member: { joinedAt: any; }; }) {
        await interaction.reply(
            `Pong!`,
        );
    },
};