import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { defaultPrefix, colorPallets } from '../../../config.json'
import {CATEGORY_ICONS} from '../../Utils/configuration'
import * as fs from 'fs'
import * as path from 'path'

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('Show all command in this bot.'),
    async execute(interaction: any) {
        const botName = interaction.client.user.username;
        const botAvatarUrl = interaction.client.user.displayAvatarURL();
        let commandLists = [];
        let categoryIcon

        const isEmbed = new EmbedBuilder()
            .setColor(parseInt(colorPallets.primary.replace('#', ''), 16))
            .setTitle(`${botName} Command Lists.`)
            .setDescription(`Default prefix is: ${defaultPrefix}`)
            .setThumbnail(botAvatarUrl)
            .setFooter({ text: `© ${botName} | 2026` });

        const commandsPath = path.join(__dirname, '../../Commands');
        const commandsFolder = fs.readdirSync(commandsPath);

        for (const category of commandsFolder) {
            const categoryPath = path.join(commandsPath, category);
            const commandFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));

            const commandNames = commandFiles.map(f => `\` ${f.replace('.js', '')} \``);

            categoryIcon = CATEGORY_ICONS[category]
            
            isEmbed.addFields({
                name: `${categoryIcon} ${category}`,
                value: commandNames.join('\n'),
                inline: true
            })
        }

        await interaction.reply({ embeds: [isEmbed] });

    },
};