module.exports = async client => {
  const { version } = require("discord.js");

  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  // NOTE: client.wait and client.log are added by ./util/functions.js !
  await client.wait(1000);

  // Set bot status to `booting up`
  client.user.setPresence({ activity: { name: "Booting up..." }, status: "idle" });

  // Pause the client for 5 seconds
  await client.wait(5000);

  // Set bot status to the help prefix
  client.user.setPresence({ activity: { name: `for ${client.settings.get("default").prefix}vent`, type: "WATCHING"}, status: "online"});

  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.getMembers(client.guilds)} users in ${client.guilds.cache.size} servers.`, "ready");

  // Debug
  client.logger.debug(`BOT ID: ${client.user.id}`);
  client.logger.debug(`DISCORD.JS VERSION: v${version}`);
  client.logger.debug(`NODE.JS VERSION: ${process.version}`);
};
