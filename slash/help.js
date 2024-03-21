// const { EmbedBuilder } = require("discord.js");

exports.run =
    async (client, interaction) => { // eslint-disable-line no-unused-vars
  await interaction.reply({
    embeds : [ {
      title : "__How to send Vents__",
      fields : [
        {
          name : "`/vent`",
          value :
              "**Command used to send messages to #vents**\nYou can either use the command in #send-vents or send a DM to the bot.\nUsage: `/vent` then follow the steps in the modal."
        },
        {name : "\u200B", value : "\u200B"}, {
          name : "`/ping`",
          value : "**Command used to check the bot's status.**\nUsage: `/ping`"
        }
      ],
      color : 45300,
      footer : {text : "Questions? Please contact any available staff member"}
    } ]
  });
};

exports.commandData = {
  name : "help",
  description : "Gives some help on how to use the bot's commands.",
  options : [],
  defaultPermission : true,
};

// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel : "User",
  guildOnly : false
};