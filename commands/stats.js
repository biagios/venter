const Discord = require("discord.js");
const { version } = require("discord.js");
const { Octokit } = require("@octokit/rest");
//const package = require("./../package.json");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const octokit = new Octokit();
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const botInfo = new Discord.MessageEmbed();
  octokit.pulls.list({
    owner: "MiddayClouds",
    repo: "pal",
    state: "all",
  }).then((data) => {
    botInfo.setColor("#3498DB");
    botInfo.setAuthor(client.user.username,client.user.displayAvatarURL(),"https://github.com/MiddayClouds/pal");
    botInfo.setDescription("*If you need help, use*  `"+message.settings.prefix+"help`\n[Github Repository](https://github.com/MiddayClouds/pal)\n[Command List](https://feen.us/9l5qhn)");
    botInfo.addField("\u200B", "\u200B", false);
    botInfo.addField("Guilds Serving:", message.client.guilds.cache.size.toLocaleString(), true);
    botInfo.addField("Users Serving:", client.getMembers(), true);
    botInfo.addField("\u200B", "\u200B", false);
    // This simply prints the latest github commit i shall add some more like if it checks its open and stuff later..
    const latestSha = data.data[0].merge_commit_sha;
    botInfo.addField("Commit Running:", "`"+latestSha.substring(0,6)+"`", true);
    botInfo.addField("Discord.js Version:", "v"+version, true);
    botInfo.addField("Node Version:", process.version, true);
    botInfo.addField("\u200B", "\u200B", false);
    botInfo.addField("Memory Usage:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB", true);
    botInfo.addField("Uptime since restart:", duration, true);
    botInfo.addField("\u200B", "\u200B", false);
    botInfo.addField("Donate:","If you want to support Venter financially to cover server costs please donate at https://paypal.me/slemea",false)
    message.channel.send(botInfo);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info","bot-info","information","status"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "stats",
  category: "System",
  description: "Outputs statistics of the bot for nerds.",
  usage: "stats"
};
