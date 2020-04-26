const Discord = require('discord.js');
const config = require('./config.json')
const bans = require('./bans.json')
const client = new Discord.Client();
const vent = new Discord.WebhookClient(config.vent_id, config.vent_token)
const ventrevealer = new Discord.WebhookClient(config.vent_reveal_id, config.vent_reveal_token)
const games = ['Pineapple should not go on pizza.','Use +help to get help.','+help me.','Robots are forever on life support.','I no longer find Cards Against Humanity funny.','Vine was never funny.','I committed tax fraud for respect to yoshi.', 'Waluigi is the best.', 'biagios.github.io/porn', 'gradientforest.com', 'iconic.']
setInterval(function () {
  const rangame = games[Math.floor(Math.random() * games.length)]
  client.user.setActivity(rangame)
}, 60000 * 5)
client.on('warn', console.warn)
client.on('error', console.error)
client.on('ready', () => {
  console.log('-=-=-=-=-=-=-=-')
  console.log('Starting Venter!...')
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`)
  console.log('Trying to log in with token...')
  console.log('-=-=-=-=-=-=-=-')
})
client.on('disconnected', function () {console.error('Disconnected!')})
client.on('reconnecting', () => console.log('I am reconnecting now!'))
client.on('guildCreate', guild => {console.log(`New server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`)})
client.on('guildDelete', guild => {console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)})
client.on('message', async message => {
  /// BOT DETECTOR 3000
  if (message.author.bot) { return };
  if (message.author.bot || message.channel.type === 'dm') {return};

  /// Checks Prefix PLEASE NEVER EDIT OR TOUCH THIS I SWEAR
  if (message.content.indexOf(config.prefix) !== 0) return

  let args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let content = message.content.toLowerCase()
  let splittedContentArgs = message.content.trim().split(/ +/g)
  let splittedContentCommand = splittedContentArgs.shift().toLowerCase()
  if (message.channel.type === 'dm') {console.log('Discord -> Bot -> Direct Message: DM by ' + message.author.tag + ' (' + message.author.id + ' | Content: ' + message.content + ')')}

  /// BAN DETECTOR 2000
  if (bans.cBans.includes(message.author.id) && config.activeCommands.includes(command)) {
      console.log("Banned User " + message.member.user.tag + " (" + message.author + ")" + " tried to use the command: "+ command )
      message.reply('You are banned from using this command.')
      return
  }


  /// Vent Command
  if (command === 'vent' || splittedContentCommand === 'vent') {
    if (!args[0]) {
      message.channel.send('Please provide text to send.')
      return
    }
    const rant = args.join(' ')
    message.delete().catch(O_o => {})
    vent.send(rant + ' - Anonymous')
    ventrevealer.send('Discord -> Bot -> Direct Message by ' + message.author.tag + ' ( Author ID' + message.author.id + ' | Content: ' + message.content + ')')
    message.channel.send('Message sent to #vent successfully.')

    if (rant.includes('suicide')){
      message.author.send('Pal has detected your message has to do with suicide. If you are struggling please remember you are not alone and many have gone throught the same as you. Please, if you are thinking about it refer to one of these numbers: https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines')
    }
  }
})

client.login(config.token)
