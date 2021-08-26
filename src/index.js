const fs = require('fs');
const {
	Client,
	Intents,
	Collection
} = require('discord.js');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_BANS,
	]
});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

// Login into the bot
(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client);
	}

	client.handleEvents(eventFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	client.login(process.env.TOKEN);
	client.dbLogin();
})();