const { version } = require("discord.js");
const { codeBlock } = require("discord.js");
const { DurationFormatter } = require("@sapphire/time-utilities");
const durationFormatter = new DurationFormatter();

exports.run = async (client, interaction) => {
  // eslint-disable-line no-unused-vars
  const duration = durationFormatter.format(client.uptime);
  const stats = codeBlock(
    "asciidoc",
    `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.guilds.cache
      .map((g) => g.memberCount)
      .reduce((a, b) => a + b)
      .toLocaleString()}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Channels   :: ${client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`,
  );
  await interaction.reply({
    embeds: [
      {
        title: "Bot Statistics",
        description: "If you need help please use `/help` instead.",
        fields: [
          { name: "\u200B", value: "\u200B" },
          {
            name: "Users Serving:",
            value: client.guilds.cache
              .map((g) => g.memberCount)
              .reduce((a, b) => a + b)
              .toLocaleString(),
            inline: true,
          },
          {
            name: "Channels Serving:",
            value: client.channels.cache.size.toLocaleString(),
            inline: true,
          },
          { name: "\u200B", value: "\u200B" },
          { name: "Discord.js Version", value: "v" + version, inline: true },
          { name: "Node Version", value: process.version, inline: true },
          { name: "\u200B", value: "\u200B" },
          { name: "Uptime:", value: duration, inline: true },
          {
            name: "Memory Usage:",
            value:
              (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB",
            inline: true,
          },
          { name: "\u200B", value: "\u200B" },
        ],
        color: 45300,
        footer: { text: "Coding your sort of thing? Help on GitHub!" },
        timestamp: new Date().toISOString(),
      },
    ],
  });
};

exports.commandData = {
  name: "stats",
  description: "Show's the bots stats.",
  options: [],
  defaultPermission: true,
};

// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel: "User",
  guildOnly: false,
};
