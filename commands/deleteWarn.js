module.exports = {
	name: 'delwarn',
	aliases: ['deletewarn'],
	description: 'Deletes a warning',
	staff:true,
	execute(message, args) {
		var memberIdToLookup = message.mentions.members.first().id

		function eraseWarn(currentNumber, userLog){
			var warnToDelete = args[1]
			if(!userLog[`${message.mentions.members.first().id}_warn${warnToDelete}`]){
				message.channel.send('Warning doesn\'t exist.')
				return
			}

			fixWarnEntries = function(currentNumberToMigrate, userLog){
				console.log(`Creating `+userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate}`])
				userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate}`] = userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate+1}`]
				console.log(`Created` + userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate+1}`])
				delete userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate+1}`]
				let data = JSON.stringify(userLog);
				fs.writeFile('./warnings.json', data, (err) => {console.log(err)})
				var currentNumberToMigrate = currentNumberToMigrate+1
				if(userLog[`${message.mentions.members.first().id}_warn${currentNumberToMigrate}`]){
					fixWarnEntries(currentNumberToMigrate, userLog)
				}
			}

			delete userLog[`${message.mentions.members.first().id}_warn${warnToDelete}`];

			userLog[`${message.mentions.members.first().id}_warnings`] = userLog[`${message.mentions.members.first().id}_warnings`]-1;
			let data = JSON.stringify(userLog);
			
			fs.writeFile('./warnings.json', data, (err) => {if(err)console.log(err)})

			console.log(userLog[`${message.mentions.members.first().id}_warn${warnToDelete+1}`])
			if(userLog[`${message.mentions.members.first().id}_warn${warnToDelete+1}`]){
				delete require.cache[require.resolve(`../warnings.json`)]
				var currentNumberToMigrate = warnToDelete
				userLog = require('../warnings.json')

				fixWarnEntries(currentNumberToMigrate, userLog)
			}

			message.channel.send(`<@${message.mentions.members.first().id}> now has `+userLog[`${message.mentions.members.first().id}_warnings`]+ ` warnings.`)
		}


		if (!fs.existsSync(`./warnings.json`)){
			message.channel.send('`warnings.json` doesn\'t exist. Please do at least one warning to create the file.')
		}else{
			var userLog = require('../warnings.json')
			if(!userLog[memberIdToLookup+`_warnings`]){
				message.channel.send('No entries found.')
				return
			}
			console.log(userLog[memberIdToLookup+`_warnings`])
			var currentNumber = 0
			const embed = new Discord.MessageEmbed()
			eraseWarn(currentNumber, userLog, embed)
		}
	},
};