module.exports = [
	{
		name: "es",
		description: 'Shows helpful patch stuff',
		aliases: ['patches'],
		execute(message, args) {
			message.channel.send(
				`For pirated eshop-games, gamecard installs and garbage-"homebrew"-NSPs you need patches for the system to allow that.`+
				`You can find the latest ones here https://github.com/ITotalJustice/patches/releases/latest.`
			)
		}
	}, {
		name: 'bs',
		description: 'Germany',
		execute(message, args) {
			message.channel.send(":b:or :b:irated :b:shop-:b:ames :b:ou :b:eed :b:S :b:ignature :b:atches. :b:s :b:heir :b:nly :b:urpose :b:s :b:o :b:llow :b:iracy :b:e're :b:ot :b:roviding :b:ny :b:elp :b:ith :b:nstallation :b:f :b:aid :b:atches :b:r :b:irated :b:ames :b:fterwards")
		},
	}
]
