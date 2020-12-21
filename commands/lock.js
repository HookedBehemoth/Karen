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
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
			channel.send('🔒', '<#' + channel + '> was locked.\n')
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
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
			channel.send('🔒', '<#' + channel + '> was unlocked.\n', channel)
		}
	}
]
