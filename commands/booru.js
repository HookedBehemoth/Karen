const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const boorus = require('../booru.json');

/* All important information is in the attributes */
const ParserOptions = {
	attributeNamePrefix: '',
	attrNodeName: 'attr',
	ignoreAttributes: false,
};

module.exports = []

for (const key in boorus) {
	const booru = boorus[key]
	const title = booru.name
	const tags = booru.tags.join('%20')

	module.exports.push({
		name: key,
		description: booru['desc'],
		execute(message, args) {
			if (message.author.bot) return;

			/* Get post count */
			fetch(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=0&tags=${tags}`)
				.then(res => res.text())
				.then(body => {
					const count = Number(parser.parse(body, ParserOptions)['posts']['attr']['count'])
					const index = Math.floor(Math.random() * count)

					/* Only request the one element we care about. */
					fetch(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=${tags}&limit=1&pid=${index}`)
						.then(res => res.text())
						.then(body => {
							const floof = parser.parse(body, ParserOptions)['posts']['post']['attr']
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
