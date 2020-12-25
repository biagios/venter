exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send({
    content: "In order to help the bot grow please consider voting for Pal on the websites listed below.",
    embed: {
      color: 3447003,
      fields: [
        {
          name: "Vote on top.gg : ",
          value: "[Click here](https://feen.us/1vav8p)",
        },
      ],
      footer: {
        text: "Thank you <3",
        icon_url: "https://avatars0.githubusercontent.com/u/33847796?s=200&v=4",
      },
    },
  });
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "vote",
  category: "Miscelaneous",
  description: "Sends you a message with a link to vote for the bot.",
  usage: "`vote`"
};
