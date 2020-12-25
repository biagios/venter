// This is just a failsafe that checks that the node version isnt the problem
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");

// Load up the API permissions the bot needs
const { Client, Intents } = require("discord.js");

// Save the API permissions the bot needs
const botIntents = new Intents(Intents.NON_PRIVILEGED);
botIntents.remove(["GUILD_PRESENCES"]);

// Load other modules that are needed
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

// Defining the client.
const client = new Client({ ws: { intents: botIntents } });
//ONLYUSEWHENNEEDEDINDEBUGPLS const client = new Client()

// Here we load the config file that contains our token and our prefix values
client.config = require("./config.js");

client.bans = require("./bans.js");

// Require the logger module, this sends webhooks with logs
client.logger = require("./modules/Logger");

// Require some useful functions
require("./modules/functions.js")(client);

// Create Cooldowns
client.cooldowns = new Discord.Collection();

// Aliases and commands are put in collections where they can be read from
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome EnMap module, which essentially saves a collection to disk
client.settings = new Enmap({name: "settings"});

// Create the "initializer" for the bot
const init = async () => {

  // Here we load the commands into memory, as a collection, so they're accessible everywhere
  const cmdFiles = await readdir("./commands/");

  // Log the loading of commands.
  client.logger.log(`Loading a total of ${cmdFiles.length} commands...`);

  const loadedCommands = [];

  // Complete the following actions for every file in commands folder
  cmdFiles.forEach(f => {
    // Check if it ends with .js otherwise ignore it
    if (!f.endsWith(".js")) return;
    // Actually load the command
    const response = client.loadCommand(f,loadedCommands);
    if (response) console.log(response);
  });

  client.logger.log(`Commands Loaded: ${loadedCommands}`);

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");

  // Log the loading of total bot events.
  client.logger.log(`Loading a total of ${evtFiles.length} events...`);

  const loadedEvents = [];

  // Complete the following for each event
  evtFiles.forEach(file => {
    // Define the name
    const eventName = file.split(".")[0];
    loadedEvents.push(` ${eventName}`);
    // Require the event
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments provided by the discord.js event.
    client.on(eventName, event.bind(null, client));
  });

  // Log the event
  client.logger.log(`Events Loaded: ${loadedEvents}`);

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

};

// Start the bot.
init();
