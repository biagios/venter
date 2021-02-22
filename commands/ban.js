exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot","get","pull","shutdown"],
  permLevel: "Bot Admin",
  cooldown: 20
};

exports.help = {
  name: "ban",
  category: "System",
  description: "Bans user from all aspects of the bot",
  usage: "`ban <ID>`"
};
