exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const helpInfoEmbed = new Discord.MessageEmbed();
  helpInfoEmbed.setTitle("__How to send Vents__")
  helpInfoEmbed.addField("`!vent`","**Command used to send messages to #vents**\nYou can either use the command in #send-vents or send a DM to the bot.\nCommand usage: `!vent <message>` for example `!vent Hello`",false)
  helpInfoEmbed.addField("\u200B","\u200B",false);
  helpInfoEmbed.addField("`!ping`","**Command used to check the bot's status.**\nCommand usage: `!ping`",false)
  helpInfoEmbed.setFooter("If you have any more questions or suggestions contact any Staff members.")
  message.channel.send(helpInfoEmbed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "help",
  category: "Miscelaneous",
  description: "Outputs a list of commands the bot can execute.",
  usage: "`help`"
};
