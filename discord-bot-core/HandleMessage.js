// @ts-ignore
const ParentPackageJSON = require("../package.json");

/**@param param*/
function handleMessage(message, commands, guildData) {
	if (!message.content.startsWith(message.guild.me.toString())) //criteria for a command is the bot being tagged
		return;

	const botName = "@" + (message.guild.me.nickname || message.guild.me.user.username),
		isMemberAdmin = message.member.permissions.has("ADMINISTRATOR"),
		split = message.content.split(/ +/),
		params = split.slice(2, split.length),
		command = commands[Object.keys(commands).find(x => commands[x].name.toLowerCase() === (split[1] || "").toLowerCase())];

	if (!command)
		handleInternalCommand(message, params);
	else if (params.length < command.expectedParamCount)
		message.reply(`Incorrect syntax!\n**Expected:** *${botName} ${command.syntax}*\n**Need help?** *${botName} help*`);
	else if(isMemberAdmin || !command.admin)
		command.invoke({ message, params, guildData });
}

/**@param param*/
function handleInternalCommand(message, split) {
	if (split[1].toLowerCase() === "version")
		message.reply(`${ParentPackageJSON.name} v${ParentPackageJSON.version}`);
	else if(split[1].toLowerCase() === "help")
		message.reply(createHelpEmbed());
}

function createHelpEmbed() {
	return "not yet implemented";
}

module.exports = handleMessage;