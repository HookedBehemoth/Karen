const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const boorus = require('../booru.json');
const Discord = require('discord.js')

/* All important information is in the attributes */
const XmlParserOptions = {
	attributeNamePrefix: '',
	attrNodeName: 'attr',
	ignoreAttributes: false,
};

module.exports = [
	{
		name: 'booru',
		description: 'Modify booru commands',
		usage: '<amount>',
		cooldown: 0,
		staff: true,
		execute(message, args, client) {
			var boorus = require('../booru.json')
			switch (args[0]) {
				case 'list':
				case 'l':
					for (const key in boorus) {
						const booru = boorus[key]

						/* Hide the truth from the sheep */
						if (booru.whitelist && !booru.whitelist.includes(message.channel.id))
							continue

						/* Construct embed */
						const embed = new Discord.MessageEmbed()
							.setColor(0xFFA500)
							.setTitle(booru.name)
							.setDescription(booru.desc)
							.addField('Command', key)
							.addField('Tags', booru.tags.join(', '))

						if (booru.whitelist)
							embed.addField('Whitelist', booru.whitelist.map(id => `<#${id}>`).join(', '))

						message.channel.send(embed)
					}
					break
				case 'modify':
				case 'm':
					break
				case 'add':
				case 'a':
					break
			}
		},
	}
]

for (const key in boorus) {
	const booru = boorus[key]
	const title = booru.name
	const tags = booru.tags.join('%20')
	const whitelist = booru.whitelist

	module.exports.push({
		name: key,
		description: booru['desc'],
		execute(message, args) {
			/* Ignore bot messages */
			if (message.author.bot)
				return

			/* If whitelist exists check */
			if (whitelist && !whitelist.includes(message.channel.id))
				return

			/* Get post count */
			fetch(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=0&tags=${tags}`)
				.then(res => res.text())
				.then(body => {
					const count = Number(parser.parse(body, XmlParserOptions)['posts']['attr']['count'])
					const index = Math.floor(Math.random() * count)

					/* Only request the one element we care about. */
					fetch(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${tags}&limit=1&pid=${index}`)
						.then(res => res.text())
						.then(body => {
							const floof = parser.parse(body, XmlParserOptions)['posts']['post']['attr']
							const senko = new Discord.MessageEmbed()
								.setTitle(title)
								.setImage(floof['file_url'])
								.setURL(`https://gelbooru.com/index.php?page=post&s=view&id=${floof['id']}`)
							message.channel.send(senko)
						})
				})

		}
	})
}
