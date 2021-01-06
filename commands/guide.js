module.exports = [
	{
		name: 'guide',
		description: 'Displays some usefull guides',
		execute(message, args) {
			const Discord = require('discord.js');
			if (message.author.bot) return;
			message.channel.send(`**Generic starter guides:**\nBeginners Guide: https://switch.homebrew.guide/`);
		},
	}, {
		name: 'dns',
		description: "shows 90's dns options",
		staff: false,
		execute(message, args) {
			const Discord = require('discord.js');
			const DNS = new Discord.MessageEmbed()
				.setTitle('90DNS IP adresses')
				.setDescription("These are the 90DNS IP adresses: \n `207.246.121.77` (USA) \n `163.172.141.219` (France) \n \n You will have to set up the DNS for every wifi network you connect to.")
			message.channel.send(DNS)
		},
	}, {
		name: 'sd',
		description: 'Shows the SD command',
		execute(message, args) {
			const Discord = require('discord.js');
			const embed = new Discord.MessageEmbed()
			embed.setTitle("SD Folder")
			embed.setDescription('If you are getting an error in hekate such as: Missing lp0 lib,  Missing or old minerva lib or Update bootloader \n Please check and make sure that you **extracted the contents of the SD folder onto your SD card**')
			message.channel.send(embed)
		},
	}, {
		name: 'exfat',
		aliases: ['fat32'],
		description: 'Displays info on why not to use exfat',
		execute(message, args) {
			const Discord = require('discord.js');
			const client = new Discord.Client();
			message.channel.send(
				`The exFAT standard is shit and shouldn't be used. Especially shitty homebrew software triggers corruption.\n\n`+
				`If your PC doesn't allow you to format your card to FAT32 you can do that in hekate\n`+
				`Tools -> Arch bit · RCM · Touch · Partition -> Partition `
			)
		},
	}
]
