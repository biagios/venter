const logger = require("../modules/logger.js");
const wait = require("util").promisify(setTimeout);
const { version, ActivityType } = require("discord.js");

module.exports = async client => {

  // Pause the client for 1 second
  await wait(1000);

  // Set bot status to `booting up`
  client.user.setPresence({activities: [{ name: "Booting up...", type: ActivityType.Custom }],status: "idle",});

  // Pause the client for 5 seconds
  await wait(5000);

  // Set bot status to the vent prefix
  client.user.setPresence({activities: [{ name: "Use /vent", type: ActivityType.Custom }],status: "online",});

  // Debug
  logger.debug(`BOT ID: ${client.user.id}`);
  logger.debug(`DISCORD.JS VERSION: v${version}`);
  logger.debug(`NODE.JS VERSION: ${process.version}`);

  // Log that the bot is online.
  logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
};
