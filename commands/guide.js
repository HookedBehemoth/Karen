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
		description: 'Displays info on why not to use exfat',
		execute(message, args) {
			const Discord = require('discord.js');
			const client = new Discord.Client();
			const exampleEmbed = new Discord.MessageEmbed()
				.setTitle("Guiformat")
				.setURL('http://nas.sdshrekup.com:5000/sharing/vBhHnYfti')
				.setDescription('A useful tool for formatting SD cards over 32GB as FAT32 on Windows.')
			message.channel.send("The exFAT drivers built into the Switch has been known to corrupt SD cards and homebrew only makes this worse. Backup everything on your SD card as soon as possible and format it to FAT32. On Windows, if your SD card is over 32GB then it will not let you select FAT32 from the built-in format tool, however you can use a tool like GUIFormat to format it.")
			message.channel.send(exampleEmbed)
		},
	}
]
