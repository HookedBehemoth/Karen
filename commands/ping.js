module.exports = [
	{
		name: 'ping',
		description: 'Ping!',
		execute(message, args) {
			message.channel.send(`Your ping is \`${Date.now() - message.createdTimestamp}\` ms`);
		},
	}
]
