// This event executes when the bot joins a new guild.

module.exports = (client, guild) => {
  
  // Log the event
  client.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) with ${guild.memberCount} members added the bot.`);

};
