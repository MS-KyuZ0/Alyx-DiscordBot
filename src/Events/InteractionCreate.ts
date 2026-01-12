import { Events, Integration, MessageFlags } from 'discord.js'

module.exports = {
    name: Events.InteractionCreate,
    async execute(DiscordBot: any, interaction: any) {

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.Commands.get(interaction.commandName);

            if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);

            try {
                await command.execute(interaction);
            } catch (err) {
                console.error(err);

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There was an error while executing this command!',
                        flags: MessageFlags.Ephemeral,
                    })
                } else {
                    await interaction.reply({
                        content: 'There was an error while executing this command!',
                        flags: MessageFlags.Ephemeral,
                    });
                }
            }
        } else if (interaction.isModalSubmit()) {
            const keyOfModal = interaction.customId;
            let getInput: string;

            switch(keyOfModal)  {
                case 'userBan':
                    getInput = interaction.fields.getStringSelectValues('userbanned')[0];

                    await interaction.guild.members.ban(getInput).then(async () => {
                        await interaction.reply(`Succesfully banned <@${getInput}> in this server!`);
                    })
                    break;
                case 'userKick':
                    getInput = interaction.fields.getStringSelectValues('userkicked')[0];

                    await interaction.guild.members.ban(getInput).then(async () => {
                        await interaction.reply(`Succesfully kick <@${getInput}> in this server!`);
                    })
                    break;
                default:
                        await interaction.reply(`Sorry this command is currently under maintenance!`).then(() => {
                            console.log(`I can't find the ${keyOfModal}!`)
                        });
                    break;
            }
        }
    },
}