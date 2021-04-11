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
	},  {
		name: 'lotus',
		aliases: ['gamecard', 'gc'],
		description: 'Lotus downgrade info',
		execute(message, args) {
			const Discord = require('discord.js');
			const client = new Discord.Client();
			message.channel.send(
				`Gamecart Controller Updates (4.0.0, 9.0.0, 11.0.0, and 12.0.0)\n` +
				`In 4.0.0, 9.0.0, 11.0.0 and 12.0.0, Nintendo updated the gamecard controller ("lotus") to a new version, so if you update to one of these firmware ranges, it'll lock you out of running gamecards on all lower ranges.\n` +
				`This is because lotus keeps track of its firmware updates independently of the main SoC. As lotus cannot be hacked, updating it is a hard requirement to get cards working on newer versions.\n` +
				`\n` +
				`This leads to ns (010000000000001F) crashing with error 2002-2634 (0x149402), if nogc isn't enabled/you're running stock.\n` +
				`\n` +
				`If Atmosphere detects you're running a newer firmware on a console whose anti-downgrade fuses aren't burned yet, it'll disable the gamecard reader in an effort to keep gamecards working on older firmwares.\n` +
				`\n` +
				`If you want to run gamecarts on the latest firmware versions, and don't mind losing out on older firmware versions, do one of the following:\n` +
				`\n` +
				`If you boot with Hekate:\n` +
				`1. Go to Options, in the top right corner\n` +
				`2. Turn ":shrek: Auto NoGC" to OFF                                  (yes, it's really ":shrek: Auto NoGC")\n` +
				`3. Save Options, at the bottom center of the screen.\n` +
				`\n` +
				`If you boot with Atmosphere Fusée:\n` +
				`1. Open atmosphere/config/BCT.ini in a text editor, on a PC, Mac, or Android device. If it doesn't exist, copy the template from atmosphere/config_templates/\n` +
				`2. Under the section labeled [stratosphere], force-disable nogc by adding the line nogc = 0`
			)
		},
	}
]
