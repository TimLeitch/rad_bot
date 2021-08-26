require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	execute(message) {
		console.log(message.content.slice(process.env.prefix.lenght).split(/ +/));
	},
};

