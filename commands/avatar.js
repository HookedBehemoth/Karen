module.exports = [
	{
		name: 'avatar',
		description: 'Grabs the current users avatar',
		execute(message, args) {
			const Discord = require('discord.js');
			const user = message.mentions.users.first() || message.author;
			const avatarEmbed = new Discord.MessageEmbed()
				.setColor(0x333333)
				.setAuthor(user.username)
				.setImage(user.avatarURL);
			message.channel.send(avatarEmbed);
		},
	}
]
