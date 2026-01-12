import { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, LabelBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers || PermissionFlagsBits.Administrator),
    async execute(interaction: any) {
        const isModal = new ModalBuilder()
            .setCustomId('userBan')
            .setTitle('Member Name');

        const UserBanInput = new StringSelectMenuBuilder()
            .setCustomId('userbanned')
            .setRequired(true);

        const cachedMembers = interaction.guild.members.cache

        cachedMembers.forEach((member: any) => {
            const memberId = member.user.id
            const memberUsername = member.user.username

            UserBanInput.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(`${memberUsername}`)
                    .setValue(memberId)
            )
        });

        const banLabel = new LabelBuilder()
            .setLabel('Select member to banned:')
            .setStringSelectMenuComponent(UserBanInput);

        isModal.addLabelComponents(banLabel);

        // await interaction.reply({content: 'test'});
        await interaction.showModal(isModal);
    },
};