module.exports = [
	{
		name: 'lock',
		aliases: ['lockout'],
		description: 'Locks the channel the command is ran in.',
		usage: '',
		cooldown: 0,
		mod: true,
		execute(message, args) {
			const channel = message.channel
			const reason = args.join(' ')
			try {
				channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
				if (args != '') {
					respond('🔒', '<#' + channel + '> was locked.\nReason: ' + reason, channel)
				} else {
					respond('🔒', '<#' + channel + '> was locked.\n', channel)
				}
				modaction(this.name, message.author.tag, channel.name, message.content)
			}
			catch (error) {
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}

		}
	},
	{
		name: 'unlock',
		aliases: [],
		description: 'Unlocks the channel the command is ran in.',
		usage: '',
		cooldown: 0,
		mod: true,
		execute(message, args) {
			const channel = message.channel
			const reason = args.join(' ')
			try {
				channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
				if (args != '') {
					respond('🔒', '<#' + channel + '> was unlocked.\nReason: ' + reason, channel)
				} else {
					respond('🔒', '<#' + channel + '> was unlocked.\n', channel)
				}
				modaction(this.name, message.author.tag, channel.name, message.content)
			}
			catch (error) {
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}

		}
	}
]
