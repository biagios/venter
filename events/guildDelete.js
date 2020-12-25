// This event executes when the bot leaves a guild (server).

module.exports = (client, guild) => {

  // If there is an outage, return.
  if (!guild.available) return;

  // No use keeping stale data, remove them from the settings and log it!
  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }

  // Log to the console that a guild was left.
  client.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) with ${guild.memberCount} members removed the bot.`);

};
