const bans = require("../bans.js");

exports.run = async (client, interaction) => {
  // eslint-disable-line no-unused-vars
  const id = interaction.options.getUser('id');
  bans.users.push(id);
  try {
    await interaction.reply({
      embeds: [
        {
          author: {
            name: "User Banned",
            icon_url:
                    "https://cdn.discordapp.com/emojis/710291841639252017.webp",
          },
          description: "User has been banned from utilising the bot.\nRemember to add his ID to the ban list.",
          color: 6076508,
          footer: { text: "User Banned: " + id },
          timestamp: new Date().toISOString(),
        },
      ],
      ephemeral: true,
    });
  }
  catch (err) {
    console.error(err);
  }

};
  
exports.commandData = {
  name: "ban",
  description: "Ban user from utilising the bot.",
  options: [
    { name: "id", description: "The ID of the user to ban.", required: true }
  ],
  defaultPermission: true,
};

exports.conf = {
  permLevel: "Bot Admin",
  guildOnly: false,
};
  