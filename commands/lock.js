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
			channel.send(`🔒 <#${channel.id}> was locked. 🔒`)
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
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
			channel.send(`:unlock: <#${channel.id}> was unlocked. :unlock:`)
		}
	}
]
