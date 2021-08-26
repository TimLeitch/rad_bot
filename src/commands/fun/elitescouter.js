const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elitescouter')
		.setDescription('Explains who EliteScouter is!'),
	async execute(interaction) {
		await interaction.reply('EliteScouter is a guy that has no time, and diamond hands!');
	},
};