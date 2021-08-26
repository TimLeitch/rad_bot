module.exports = {
	name: 'ready',
	once: true,
        async execute(client) {
            console.log(`Ready! Logged into Discord as ${client.user.tag}`);
	},
};