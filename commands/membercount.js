module.exports = [
	{
		name: 'memebercount',
		description: 'Counts the memebers in the current server',
		execute(message, args) {
			if (message.author.bot) return;
			message.channel.send("There's like, uhhhhh a bunch");
		},
	}, {
		name: 'membercount',
		description: 'Counts the members in the current server',
		execute(message, args) {
			if (message.author.bot) return;
			message.channel.send(`${message.guild.name} has ${message.guild.memberCount} members!`);
		},
	}
]

