console.log('Loading, please wait a moment.')
const version = '1.0.0'

const fs = require('fs')

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {
	MessageEmbed
} = require('discord.js');

const {
	prefix,
	token, 
	botLog, 
	modLog, 
	userLog,
	staffRoles
} = require ('./config.json');


respond = function (title, content, sendto, color){
	//Since hax4dayz likes to copy my code from my other bot
	//He doesn't check to make sure it works on this bot :shrek:
	sendto.send(content)
}
//Bootup check
client.once('ready', () => {
	console.log('Ready!');
	console.log('Version: '+version)
		const StartupEmbed = new Discord.MessageEmbed()
			.setColor('#00FF00')
			.setTitle('Bot Started')
			.setTimestamp()
			.setFooter('Komet-JS | Version '+version)
		client.channels.cache.get(`${botLog}`).send(StartupEmbed);
				//Check for updates
				const https = require('https');
				const file = fs.createWriteStream("version.txt"); 
				const request = https.get("https://hax4dazy.github.io/Komet-JS/version/latestversion.txt", function(response) {
				response.pipe(file);
				const changedfile = fs.createWriteStream("changelog.txt"); 
				const changedrequest = https.get("https://hax4dazy.github.io/Komet-JS/version/changelog.txt", function(changedresponse) {
				changedresponse.pipe(changedfile);
				fs.readFile('./changelog.txt', function(err, data){
					const changelog = data.toString()
					fs.readFile('./version.txt', function(err, data){
						const latestversion = data.toString().replace(/[\r\n]+/g, '');
				 		if(version != latestversion){
						const UpdateAvailableEmbed = new Discord.MessageEmbed()
						.setTitle('Update Available')
						.setColor('ffa500')
						.setDescription(`An update is available.\nLatest version: ${latestversion}\nYour version: ${version}`)
						.addField('Changelog',changelog,false)
						.setTimestamp()
						.setFooter('Komet-JS | Version '+version)
						client.channels.cache.get(`${botLog}`).send(UpdateAvailableEmbed);
					}
							try {
								fs.unlinkSync(`./version.txt`)
								fs.unlinkSync(`./changelog.txt`)
					  			} catch(err) {
								console.error(err)
					  }
				})
			})
		})
	})								 
});


process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Error
client.on('error', error => {
	console.error('an error has occured', error);

});

//Login
client.login(token);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//this is the code for the /commands folder
client.on('message', message => {
	var firstChar = message.content.slice(0, 1)
	if (!prefix.includes(firstChar) && !message.content.startsWith(firstChar) || message.author.bot) return;

	const args = message.content.slice(firstChar.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command)return;
	
	if(command.staff && command.staff == true && !message.member.roles.cache.some(role => staffRoles.includes(role.id))){
		message.channel.send('<@'+message.author.id+'>: Check failed. You might not have the right permissions to run this command, or you may not be able to run this command in the current channel.');
		return;
	}
	//Added so there is time to fix commands
	if(command.mod && command.mod == true && !message.member.roles.cache.some(role => staffRoles.includes(role.id))){
		message.channel.send('<@'+message.author.id+'>: Check failed. You might not have the right permissions to run this command, or you may not be able to run this command in the current channel.');
		return;
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
	}
});

//Member join
client.on('guildMemberAdd', member => {
	const guild = member.guild
	member.guild.channels.cache.get(`${userLog}`).send(`:white_check_mark: Join: <@${member.id}> | ${member.user.tag}
:calendar_spiral: Creation: ${member.user.createdAt}
:label: User ID: ${member.id}`)
	}
);

//Member leave
client.on('guildMemberRemove', member => {
	const guild = member.guild
	client.channels.cache.get(`${userLog}`).send(`:arrow_left: Leave: <@${member.id}> | ${member.user.tag}
:label: User ID: ${member.id}`)
});

//Log deleted messages
client.on('messageDelete', async message => {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});

	message.guild.channels.cache.get(modLog).send(`:wastebasket: Message delete: 
from ${message.author.tag} (${message.author.id}), in <#${message.channel.id}>:
\`${message.content}\``)
	//May fix it up someday TM
	return; 
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!deletionLog) {  console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const DeletionEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Message Deleted')
	.addFields(
		{ name: 'Message sent by', value: message.author.tag, inline: false },
		{ name: 'Deleted by', value: 'Unknown - Audit log was not found.', inline: false },
		{ name: 'Sent in', value: message.channel.name, inline: false },
		{ name: 'Message', value: message.content, inline: false },
	)
	.setTimestamp()
	client.channels.cache.get(`${modLog}`).send(DeletionEmbed)}

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
	const { executor, target } = deletionLog;


	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: executor.tag + ` (${executor.id})`, inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
		client.channels.cache.get(`${modLog}`).send(DeletionEmbed)
		return;
	}	else {
		if (target.id === message.author.id) return;
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: 'Unable to find.', inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
		client.channels.cache.get(`${modLog}`).send(DeletionEmbed)
		return;
	}
});

//Log message edits
client.on('messageUpdate', (oldMessage, newMessage) => {
	if(newMessage.author != client.user)
	newMessage.guild.channels.cache.get(modLog).send(`:pencil: Message edit: 
from ${newMessage.author.tag} (${newMessage.author.id}), in <#${newMessage.channel.id}>:
\`${oldMessage.content}\` → \`${newMessage.content}\``)
})
