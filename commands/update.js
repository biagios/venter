exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const updatingEmoji = client.emojis.cache.get("717876611440967740");
  await message.reply(`${updatingEmoji} | Updating from GitHub...`);
  await client.user.setPresence({ activity: { name: "Bot rebooting..." }, status: "dnd" });
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot","get","pull","shutdown"],
  permLevel: "Bot Admin",
  cooldown: 20
};

exports.help = {
  name: "update",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "`reboot`"
};
