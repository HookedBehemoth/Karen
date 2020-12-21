const Discord = require('discord.js');
const request = require('request');
const parser = require('fast-xml-parser');

/* All important information is in the attributes */
const ParserOptions = {
	attributeNamePrefix: "",
	attrNodeName: "attr",
	ignoreAttributes: false,
};

/* Sadly people lewd the fox */
const tags = "senko_(sewayaki_kitsune_no_senko-san)%20-swimsuit%20-ass"

module.exports = {
	name: 'senko',
	description: 'Displays floof',
	execute(message, args) {
		if (message.author.bot) return;

		/* Get post count */
		const page = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=0&tags=' + tags
		request({ url: page }, function (err, res, response) {
			if (err) {
				throw err;
			}
			const count = Number(parser.parse(response, ParserOptions)["posts"]["attr"]["count"])
			const index = Math.floor(Math.random() * count)

			/* Only request the one element we care about. */
			const page = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=' + tags + '&limit=1&pid=' + index
			request({ url: page }, function (err, res, response) {
				if (err) {
					throw err;
				}
				const floof = parser.parse(response, ParserOptions)["posts"]["post"]["attr"]
				const senko = new Discord.MessageEmbed()
					.setTitle("Senko")
					.setImage(floof["file_url"])
					.setURL("https://safebooru.org/index.php?page=post&s=view&id=" + floof["id"])
				message.channel.send(senko)
			});
		});
	},
};