console.log('Loading, please wait a moment.')

fs = require('fs')
Discord = require('discord.js');

client = new Discord.Client();
client.commands = new Discord.Collection();
commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const config = require('./config.json')

//Required files
let requiredFiles = ["warnings.json", "userNotes.json"]
for (let index = 0; index < requiredFiles.length; index++) {
	const element = requiredFiles[index];
	if (!fs.existsSync('./' + element)) {
		fs.writeFileSync('./' + element, JSON.stringify({}))
	}
}

//Bootup check
client.once('ready', () => {
	commitID = "2.0.0"
	console.log('Ready!');
	const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Bot Started')
		.setTimestamp()
		.setFooter(`${client.user.username} | Version: ${commitID}`)
	client.channels.cache.get(`${config.botLog}`).send(StartupEmbed);
})

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Error
client.on('error', error => {
	console.error('an error has occured', error);
});

//Login
client.login(config.token);

for (const file of commandFiles) {
	const commands = require(`./commands/${file}`)
	commands.forEach(command => {
		client.commands.set(command.name, command)
	})
}

//this is the code for the /commands folder
client.on('message', message => {
	var firstChar = message.content.slice(0, 1)
	if (!config.prefix.includes(message.content[0])) return;
	if (message.author.bot) return;

	const args = message.content.slice(firstChar.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.staff && command.staff == true && !message.member.roles.cache.some(role => config.staffRoles.includes(role.id))) {
		message.channel.send(`<@${message.author.id}>: Check failed. You might not have the right permissions to run this command, or you may not be able to run this command in the current channel.`)
		return
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}
});

if (config.userLogging == false) {
	//Member join
	client.on('guildMemberAdd', member => {
		member.guild.channels.cache.get(`${config.userLog}`).send(
			`:white_check_mark: Join: <@${member.id}> | ${member.user.tag}\n` +
			`:calendar_spiral: Creation: ${member.user.createdAt}\n` +
			`:label: User ID: ${member.id}\n` +
			`:hash: Server Member Count: ${member.guild.memberCount}`)
	}
	);

	//Member leave
	client.on('guildMemberRemove', member => {
		client.channels.cache.get(`${config.userLog}`).send(
			`:arrow_left: Leave: <@${member.id}> | ${member.user.tag}\n` +
			`:label: User ID: ${member.id}\n` +
			`:hash: Server Member Count: ${member.guild.memberCount}`)
	});
}

//Log deleted messages
client.on('messageDelete', async message => {
	message.guild.channels.cache.get(config.modLog).send(
		`:wastebasket: Message delete:\n` +
		`from ${message.author.tag} (${message.author.id}), in <#${message.channel.id}>:\n` +
		`\`${message.content}\``)
});

//Log message edits
client.on('messageUpdate', (oldMessage, newMessage) => {
	if (newMessage.author.bot ||
		newMessage.author == client.user ||
		newMessage.content == oldMessage.content) return

	newMessage.guild.channels.cache.get(config.modLog).send(
		`:pencil: Message edit:\n` +
		`from ${newMessage.author.tag} (${newMessage.author.id}), in <#${newMessage.channel.id}>:\n` +
		`\`${oldMessage.content}\` → \`${newMessage.content}\``)
})

if (config.suspiciousWordsFilter == true && config.suspiciousWordsLog && config.suspiciousWordsLog) {
	// Logs bad words
	client.on('message', message => {
		if (message.author.bot) return;
		const msg = message.content.toLowerCase()
		var caughtwords = []
		for (const sus in config.suspiciousWordsLog) {
			if (msg.includes(sus)) {
				caughtwords.push(sus)
			}
		}
		if (caughtwords) {
			message.guild.channels.cache.get(config.suspiciousWordsLog).send(
				`:rotating_light: Suspicious message by <@${message.author.id}> (${message.author.id}):\n` +
				`- Contains suspicious word(s): \`${caughtwords}\`\n\n` +
				`Jump:\n` +
				`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
		}
	})
}
