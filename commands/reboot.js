const config = require("../config.js");
const { settings, ActivityType } = require("../modules/settings.js");
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const replying = settings.ensure(
    message.guild.id,
    config.defaultSettings,
  ).commandReply;
  await message.reply({
    embeds: [
      {
        author: {
          name: "Restarting...",
          icon_url: "https://cdn.discordapp.com/emojis/717876611440967740.gif",
        },
        color: 16763904,
        footer: { text: "" },
        timestamp: new Date().toISOString(),
      },
    ],
    allowedMentions: { repliedUser: replying === "true" },
  });
  await client.user.setPresence({
    activities: [{ name: "Restarting...", type: ActivityType.Custom }],
    status: "dnd",
  });

  await Promise.all(
    client.container.commands.map((cmd) => {
      // the path is relative to the *current folder*, so just ./filename.js
      delete require.cache[require.resolve(`./${cmd.help.name}.js`)];
      // We also need to delete and reload the command from the
      // container.commands Enmap
      client.container.commands.delete(cmd.help.name);
    }),
  );
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: "Bot Admin",
};

exports.help = {
  name: "reboot",
  category: "System",
  description:
    "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot",
};
