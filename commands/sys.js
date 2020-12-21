module.exports = [
	{
		name: 'gitpull',
		aliases: ['pull'],
		description: 'Pulls latest files for the bot from GitHub.',
		mod: true,
		botmanager: true,
		essential: true,
		execute(message, args, client) {
			try {
				const { exec } = require("child_process");
				exec("git pull", (error, stdout, stderr) => {
					message.channel.send(`\`\`\`stdout:\n${stdout}\n\nstderr:\n${stderr}\n\nerror:\n${error}\`\`\``)
				});
			} catch (error) {
				message.channel.send('Something went wrong.\n' + error + `\nMessage: ${message}\nArgs: ${args}\n`)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}
		}
	},
	{
		name: 'reload',
		description: 'Reloads a command',
		aliases: ['fetch'],
		usage: '[command]',
		cooldown: 0,
		botmanager: true,
		execute(message, args) {
			const allcommandName = args[0].toLowerCase();
			const command = message.client.allcommands.get(allcommandName)
				|| message.client.allcommands.find(cmd => cmd.aliases && cmd.aliases.includes(allcommandName));

			if (!command) {
				return message.channel.send(`There is no command with name or alias \`${allcommandName}\`, ${message.author}!`);
			}

			delete require.cache[require.resolve(`./${allcommandName}.js`)];

			try {
				const newCommand = require(`./${allcommandName}.js`);
				message.client.allcommands.set(newCommand.name, newCommand);
			} catch (error) {
				console.log(error);
				return message.channel.send(`There was an error while reloading a command \`${allcommandName}\`:\n\`${error.message}\``);
			}
			message.channel.send(`Command \`${allcommandName}\` was reloaded!`);
		},
	}, {
		name: 'restart',
		description: 'Kills the bot',
		aliases: ['kill', 'reboot', 'die'],
		usage: '',
		cooldown: 0,
		staff: true,
		essential: true,
		execute(message, args, client) {
			try {
				message.channel.send('Bye :wave:.')
				setTimeout(function () {
					process.exit()
				}, 3000);
			} catch (error) {
				message.channel.send('Something went wrong.\n' + error + `\nMessage: ${message}\nArgs: ${args}\n`)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
			}
		}

	}
]
