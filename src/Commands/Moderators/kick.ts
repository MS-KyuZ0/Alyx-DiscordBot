import { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, LabelBuilder } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member and kick them.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers || PermissionFlagsBits.Administrator),
    async execute(interaction: any) {
        const isModal = new ModalBuilder()
            .setCustomId('userKick')
            .setTitle('Kick Member');

        const UserKickInput = new StringSelectMenuBuilder()
            .setCustomId('userkicked')
            .setRequired(true);

        const cachedMembers = interaction.guild.members.cache

        cachedMembers.forEach((member: any) => {
            const memberId = member.user.id
            const memberUsername = member.user.username

            UserKickInput.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(`${memberUsername}`)
                    .setValue(memberId)
            )
        });

        const kickLabel = new LabelBuilder()
            .setLabel('Select member to kick out:')
            .setStringSelectMenuComponent(UserKickInput);

        isModal.addLabelComponents(kickLabel);
        await interaction.showModal(isModal);
    },
};