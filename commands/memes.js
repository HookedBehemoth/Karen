module.exports = [
	{
		name: 'eta',
		description: '@tomger eta wen',
		usage: '<text>',
		cooldown: 0,
		mod: false,
		nodelay: true,
		execute(message, args) {
			const messages = [
				'Soon:tm:',
				'June 15th',
				'Germany',
				'jelbrek wil lunch tomorrr',
				':egg:',
			]
			const index = Math.floor(Math.random() * messages.length)
			const msg = messages[index]
			message.channel.send(msg)
		}
	}, {
		name: 'clap',
		description: 'Has the bot speak with clap.',
		usage: '<text>',
		cooldown: 0,
		mod: true,
		nodelay: true,
		execute(message, args, client) {
			const { prefix } = require('../config.json');
			const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
			const text = args.join(' 👏 ');
			message.channel.send(`**${message.author.tag}** ` + '👏 ' + text + ' 👏')
			message.delete()
		}
	}
]
