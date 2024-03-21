exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  // Check user actually gave something.
  if (!args || args.length < 1) return message.reply(":no_entry: | Error! You must provide an ID to ban. To acquire one please right click on the user and select 'Copy ID'");

  // Define the argument as the banID
  let banID = args[0];

  // Check the ID is 18 digits long. Otherwise it ain't no ID.
  if (banID.length !== 18) return message.reply(":no_entry: | Error! User ID's are 18 characters long. Please try again.");

  // Push the ban to the config. I know this isn't written to the file but I can't be arsed.
  client.bans.users.push(banID)

  // Visual Confirmation for Admin
  message.reply(":white_check_mark: | ID: `"+banID+"` has been successfully added to `bans.js`. Please remember to add the user to the file before reboot.")

  // Log The Event
  client.logger.warn('NEW USER ID GIVEN TO ADD TO BANS.JS! [ID: '+banID+' ] PLEASE ADD TO BANS.JS BEFORE REBOOT!');

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tempban","blacklist"],
  permLevel: "Bot Support",
  cooldown: 5
};

exports.help = {
  name: "ban",
  category: "System",
  description: "Bans user from all aspects of the bot",
  usage: "`ban <ID>`"
};
