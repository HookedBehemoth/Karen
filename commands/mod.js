const config = require('../config.json')

module.exports = [
	{
		name: 'ban',
		description: 'Bans a user.',
		aliases: ['banish'],
		usage: '<user> <reason>',
		cooldown: 0,
		staff: true,
		execute(message, args) {
			const Discord = require('discord.js');
			const client = new Discord.Client();
			const fs = require('fs');
			try {
				if (message.author.id == message.mentions.members.first().id) { message.channel.send(`You can't perform this action on yourself.`); return; }
				const { staffRoles } = require('../config.json');
				if (message.mentions.members.first().roles.cache.some(role => staffRoles.includes(role.id))) {
					respond('', `You can't perform that action on this user.`, message.channel); return;
				}
				const { modLog } = require('../config.json');
				const user = message.mentions.users.first();
				const userid = user.id
				const authorusername = message.author.username + '#' + message.author.discriminator
				var reason = args.join(' ').replace(args[0], '')
				if (reason == '') { var reason = 'No reason provided.' }
				//fs.appendFileSync('./logs/' + userid + '-.log', 'Ban\nReason: ' + reason +'\n\n');
				//fs.appendFileSync('./logs/' + userid + '-mod.log', 'Ban issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
				message.mentions.members.first().send(`You were banned from ${message.guild.name}. The given reason was: "${reason}"\n\nThis ban does not expire.`)
				message.channel.send(message.mentions.members.first().user.tag + ' is ̶n͢ow b̕&̡.̷ 👍̡')
				message.mentions.members.first().ban({ reason: `${message.author.tag}, ${reason}` })
				message.guild.channels.cache.get(modLog).send(`:no_entry: Ban: <@${message.author.id}> banned <@${userid}> | ${user.tag}
:label: User ID: ${userid}
:pencil2: Reason: "${reason}"`)

			}
			catch (error) {
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}
		},
	}, {
		name: 'kick',
		description: 'Kicks a user from the server.',
		aliases: ['boot'],
		usage: '<user> <reason>',
		cooldown: 0,
		staff: true,
		execute(message, args) {
			try {
				function returnResponse(respone = 'Something went wrong.') {
					message.channel.send(respone)
				};
				mentionedMember = message.mentions.members.first();

				if (message.author.id == mentionedMember) {
					message.channel.send(`You can't perform this action on yourself.`);
					return;
				}
				if (mentionedMember.roles.cache.some(role => role.id === `${config.staffRoles}`)) {
					message.channel.send(`You can't perform that action on this user.`);
					return;
				}

				// Code hopefully works
				const reason = args.join(' ').replace(args[0], '')

				returnResponse('<@' + mentionedMember.id + '> was kicked from the server.')
				message.guild.channels.cache.get(config.modLog).send(`:boot: Kick: <@${message.author.id}> kicked <@${mentionedMember.id}> | ${mentionedMember.user.tag}
:label: User ID: ${mentionedMember.id}
:pencil2: Reason: "${reason}"`)
				mentionedMember.send(`You have been kicked from the server. You may rejoin at anytime.\n\nReason for kick: ${reason}`)
				mentionedMember.kick(reason)

			} catch (error) {
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}

		}
	}, {
		name: 'warn',
		description: 'Warns a user.',
		usage: '<user> <reason>',
		cooldown: 0,
		staff: true,
		execute(message, args) {

			function returnResponse(reponse = "Something happened but no response was defined.") {
				message.channel.send(reponse);
			}

			if (message.mentions.members.first()) {
				var mentionedUser = message.mentions.members.first();
			} else {
				returnResponse(`No user was mentioned.`);
				return;
			}

			if (!fs.existsSync(`./warnings.json`)) {
				returnResponse(`'warnings.json' doesn't exist. Please do at least one warning to create the file.`)
				return;
			}

			if (!args[1]) {
				returnResponse(`Please set a warning.`)
				return;
			}

			var reason = args.join(' ').replace(args[0], '')

			// all requirements are met

			if (message.author.id == mentionedUser.id) {
				returnResponse(`You can't perform this action on yourself.`);
				return;
			}

			var config = require('../config.json');
			var warnings = require('../warnings.json')

			if (mentionedUser.roles.cache.some(role => config.staffRoles.includes(role.id))) {
				returnResponse(`You can't perform that action on this user.`);
				return;
			}

			if (!warnings[mentionedUser.id])
				warnings[mentionedUser.id] = [];

			warnings[mentionedUser.id].push(reason);

			fs.writeFile('./warnings.json', JSON.stringify(warnings), (err) => {
				if (err) {
					console.log(err);
					returnResponse(`An error occured during saving.`);
					return;
				}

				var eventMessage = `You were warned on ${message.guild.name}.\nThe given reason is: ${reason}\n\nPlease read the rules. This is warning #${(warnings[mentionedUser.id].length)}.`
				switch (warnings[mentionedUser.id].length) {
					case 1:
						// only base message
						mentionedUser.send(eventMessage);
						break;
					case 2:
						eventMessage = eventMessage + "\n\n __**The next warn will result in an automatic kick.**__";
						mentionedUser.send(eventMessage)
						break;
					case 3:
						eventMessage = eventMessage + "\n\nYou were kicked because of this warning. You can rejoin right away, but two more warnings will result in an automatic ban.";
						mentionedUser.send(eventMessage)
						mentionedUser.kick({ reason: `Auto kick: ${reason}` })
						break;
					case 4:
						eventMessage = eventMessage + "\n\nYou were kicked because of this warning. You can rejoin right away, but two more warnings will result in an automatic ban.";
						mentionedUser.send(eventMessage)
						mentionedUser.kick({ reason: `Auto kick: ${reason}` })
						break;
					case 5:
						eventMessage = eventMessage + "\n\nYou were kicked because of this warning. You can rejoin right away, but **one more warning will result in an automatic ban.**";
						mentionedUser.send(eventMessage)
						mentionedUser.kick({ reason: `Auto kick: ${reason}` })
						break;
					case 6:
						eventMessage = eventMessage + "\n\nYou were banned because of this warning. This ban will not expire.";
						mentionedUser.send(eventMessage)
						mentionedUser.ban({ reason: `Auto ban: ${reason}` })
						break;
					default:
					// code block
					// nothing will happen by default
				}


				message.channel.send(`<@${mentionedUser.id}> got warned. User has ${warnings[mentionedUser.id].length} warning(s).`)
				message.guild.channels.cache
					.get(config.modLog)
					.send(`<@${message.author.id}> warned <@${mentionedUser.id}> (${mentionedUser.user.tag}) - warn #${warnings[mentionedUser.id].length}\n Reason: "${reason}"`)
				delete require.cache[require.resolve(`../warnings.json`)]
			})

		}
	}, {
		name: 'deletewarn',
		aliases: ['delwarn'],
		description: 'Deletes a warning',
		staff: true,
		execute(message, args) {

			function returnResponse(reponse = "Something happened but no response was defined.") {
				message.channel.send(reponse);
				return;
			}

			if (message.mentions.members.first()) {
				var mentionedUser = message.mentions.members.first();
			} else {
				returnResponse(`No user was mentioned.`);
				return;
			}

			if (!fs.existsSync(`./warnings.json`)) {
				returnResponse(`'warnings.json' doesn't exist. Please do at least one warning to create the file.`)
				return;
			}


			if (!args[1]) {
				returnResponse(`Please choose a (or different) warning to delete.`);
				return;
			}

			var warningNr = args[1] - 1;

			// all requirements are met

			var userLog = require('../warnings.json')
			if (!userLog[mentionedUser.id]) {
				returnResponse(`This user has no warnings.`);
				return;
			}


			if (!userLog[mentionedUser.id][warningNr]) {
				returnResponse(`Warning doesn't exist.`)
				return;
			}


			userLog[mentionedUser.id].splice(warningNr, 1); // remove the warning
			fs.writeFile('./warnings.json', JSON.stringify(userLog), (err) => {
				if (err) {
					console.log(err);
					returnResponse(`An error occured during saving.`);
					return;
				}
			})

			returnResponse(`Warning removed.`);
			delete require.cache[require.resolve(`../warnings.json`)]
		}
	}, {
		name: 'approve',
		description: 'Approves a role to a user.',
		usage: '<user> <role name>',
		cooldown: 0,
		staff: true,
		execute(message, args, client) {
			const roleConfig = require('../roles.json')
			try {
				if (message.mentions.members.size == 0) {
					message.channel.send(`Available roles: ${roleConfig.availableRoles}`)
					return;
				}
				var roleToFind = args.join('').replace(' ', '').replace(args[0], '')
				console.log(roleToFind)
				const Discord = require('discord.js');
				const rolename = roleConfig[roleToFind]
				console.log(rolename)
				const role = message.guild.roles.cache.find(role => role.id === rolename);
				const member = message.mentions.members.first();
				try {
					member.roles.add([role]).then(
						respond('✅ Role Approved', `<@${message.mentions.members.first().id}> had the \`${roleToFind}\` role approved.`, message.channel)
					)
				} catch (error) {
					respond('Error', 'Something went wrong.\n' + error, message.channel)
					return;
				}
			} catch (error) {
				respond('Error', 'Something went wrong.\n' + error + `\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}
		}
	}, {
		name: 'note',
		description: 'Adds a note to a user.',
		usage: '<user> <note>',
		cooldown: 0,
		staff: true,
		execute(message, args) {
			function returnResponse(reponse = "Something happened but no response was defined.") {
				message.channel.send(reponse);
			}

			if (message.mentions.members.first()) {
				var mentionedUser = message.mentions.members.first();
			} else {
				returnResponse(`No user was mentioned.`);
				return;
			}

			if (!args[1]) {
				returnResponse(`Please provide a note.`)
				return;
			}

			var reason = args.join(' ').replace(args[0], '')

			// all requirements are met
			var config = require('../config.json');
			var notes = require('../userNotes.json')

			if (!notes[mentionedUser.id])
				notes[mentionedUser.id] = [];

			notes[mentionedUser.id].push(reason);

			fs.writeFile('./userNotes.json', JSON.stringify(notes), (err) => {
				if (err) {
					console.log(err);
					returnResponse(`An error occured during saving.`);
					return;
				}

				message.channel.send(`<@${mentionedUser.id}> had a note added. User has ${notes[mentionedUser.id].length} note(s).`)
				delete require.cache[require.resolve(`../warnings.json`)]
			})

		}
	}
]
