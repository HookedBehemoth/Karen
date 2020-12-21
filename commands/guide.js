module.exports = {
	name: 'guide',
	description: 'Displays some usefull guides',
	execute(message, args) {
		const Discord = require('discord.js');
		const client = new Discord.Client();
		if (message.author.bot) return;
		message.channel.send(`**Generic starter guides:**\nBeginners Guide: https://switch.homebrew.guide/`);
	},
};