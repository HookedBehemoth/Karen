module.exports = {
	name: 'memebercount',
	description: 'Counts the memebers in the current server',
	execute(message, args) {
        const Discord = require('discord.js');
		const client = new Discord.Client();
		if (message.author.bot) return;
		message.channel.send("There's like, uhhhhh a bunch");
	},
};

