const Discord = require("discord.js");
const config = require("./../config.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Require moment for time logging.
  const moment = require("moment");

  // Define a timestamp.
  const timestamp = ` ${moment().format("DD/MM/YYYY")} | ${moment().format("HH:mm:ss (Z)")}`;

  // Create the webhook that publishes the vents.
  const ventSender = new Discord.WebhookClient(config.venterhook[0], config.venterhook[1]);

  // Create the webhook that logs the vent message and author.
  const ventRevealer = new Discord.WebhookClient(config.revealerhook[0], config.revealerhook[1]);

  // If there is no message then let the user know there should be.
  if (!args[0]) {
    message.channel.send(`Please provide text to send. For example !vent Hello`)
  }

  // Create the vent message.
  const ventMessage = args.join(" ");

  console.log(args.join(" "));
  // Shift the message along one.
  //ventMessage.shift();

  // Delete the message the user sent.
  message.delete();

  // Send the message to the webhook that posts it to #vents
  ventSender.send(ventMessage + ' - Anonymous')

  // Send the message to the webhook that posts it to #vents-log
  ventRevealer.send("```asciidoc\nTIMESTAMP::" + timestamp +"\nAUTHOR:: " + message.author.tag + " (" + message.author.id + ")\n" + "MESSAGE:: "+ ventMessage +"```")

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v"],
  permLevel: "User", // Who can use it
  cooldown: 5
};

exports.help = {
  name: "vent",
  category: "Miscelaneous",
  description: "Command used to send  anonymous messages to #vents",
  usage: "'vent <message>'"
};
