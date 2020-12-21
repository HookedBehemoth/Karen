module.exports = [
	{
		name: "es",
		description: 'Shows helpful patch stuff',
		aliases: ['patches'],
		execute(message, args) {
			message.channel.send(`For pirated eshop-games you need ES signature patches. As their only purpose is to allow piracy we're not providing any help with installation of said patches or pirated games afterwards`)
		}
	}, {
		name: 'bs',
		description: 'Germany',
		staff: true,
		execute(message, args) {
			message.channel.send(":b:or :b:irated :b:shop-:b:ames :b:ou :b:eed :b:S :b:ignature :b:atches. :b:s :b:heir :b:nly :b:urpose :b:s :b:o :b:llow :b:iracy :b:e're :b:ot :b:roviding :b:ny :b:elp :b:ith :b:nstallation :b:f :b:aid :b:atches :b:r :b:irated :b:ames :b:fterwards")
		},
	}
]
