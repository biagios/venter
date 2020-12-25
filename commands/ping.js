exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const pings = ["the moon.", "europe.", "oceania.", "Trump.", "a baguette.", "a pizza.", "the Netherlands.", "Google.", "the BBC.", "my mother.", "Mr. Meeseeks.", "pewdipie's firewatch stream.", "Julian Assange.", "Vine."];
  const ranPing = pings.random();
  const msg = await message.channel.send("Calculating...");
  msg.edit(`:ping_pong: | It took ${msg.createdTimestamp - message.createdTimestamp}ms to ping ${ranPing}\nAPI Latency is ${Math.round(message.client.ws.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ping","p","latency"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Everyone knows how this command works, outputs the Bot's own and the Discord API latency in ms.",
  usage: "`ping`"
};
