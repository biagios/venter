/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, level) => {
  const Discord = require("discord.js");

  const helpInfoEmbed = new Discord.MessageEmbed();

  helpInfoEmbed.setColor("#3498DB");

  // Create function for printing commands as it is much easier
  function printCommands(remove, array) {
    let command = "";
    // Repeat for the lenght of the given array
    for (var i = 0; i < array.length; i++) {

      //for (var e = 0; e < remove.length; e++) {
      //remove[e]
      // Check if the array item matches the remove item.
      if (array[i][0] == remove[0]) {
        // Do nothing
      } else if (array[i][0] == remove[1]) {
        // Do nothing
      } else if (array[i][0] == remove[2]) {
        // Do nothing
      } else {
        // Otherwise add it to command
        //console.log(array[i][1]);
        command += `${array[i][1]} `;
      }
      //}
    }

    // Return the command
    return command;
  }

  // If no specific command is called, show all filtered commands.
  if (!args[0]) {

    // Set basic embed options
    helpInfoEmbed.setTitle("Command List:");
    helpInfoEmbed.setDescription("Use `" + message.settings.prefix + "help <commandname>` for details.\nFor a more in depth command list with examples click [here](https://feen.us/9l5qhn). \nConsider using `" + message.settings.prefix + "vote` to help the bot reach more servers!" );
    helpInfoEmbed.addField(":robot: Server Prefix:", "`" + message.settings.prefix + "`");
    helpInfoEmbed.setAuthor(client.user.username, client.user.displayAvatarURL());
    helpInfoEmbed.setFooter("© Midday","https://avatars0.githubusercontent.com/u/33847796?s=200&v=4");

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.enabled == true) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true );

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    //const commandNames = myCommands.keyArray();
    //const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    //const command = [];
    const possibleCategories = [];
    const allCommandsInfo = [];

    // Set all of the commands and categories as sorted
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    // Repeat for all of sorted commands
    sorted.forEach( c => {
      // Make cat the first category found.
      const cat = c.help.category.toProperCase();
      // Set the first command
      //const currentCommand = `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} --> ${c.help.description}\n`;
      const currentCommand = `${c.help.name}`;
      if (currentCategory !== cat) {
        // Add all possible categories
        possibleCategories.push(cat);

        // Change the current category to what it is on now
        currentCategory = cat;
      }
      // Push all the possible Categories and Commands in one multidimentional array
      allCommandsInfo.push([cat, currentCommand]);
    });


    // For the lenght of the possibleCategories check what category it fits into and the print that category
    // more elifs  have to be done manually if you add more categories
    for (var i = 0; i < possibleCategories.length; i++) {
      //console.log(possibleCategories);

      if (possibleCategories[i] == "Fun") {
        const remove = ["System","Miscelaneous","Server"];
        helpInfoEmbed.addField(":tada: **Fun:**","```" + printCommands(remove,allCommandsInfo) + "```", true);
      } else if (possibleCategories[i] == "Miscelaneous") {
        const remove = ["System","Fun","Server"];
        // Print Miscelaneous category
        helpInfoEmbed.addField(":game_die: **Miscelaneous:**","```" + printCommands(remove,allCommandsInfo) + "```", true);
        //helpInfoEmbed.addField("\u200B","\u200B")
      } else if (possibleCategories[i] == "System") {
        const remove = ["Miscelaneous","Fun","Server"];
        // Print System category
        helpInfoEmbed.addField(":wrench: **System:**","```" + printCommands(remove,allCommandsInfo) + "```", true);
      } else if (possibleCategories[i] == "Server") {
        const remove = ["Miscelaneous","Fun","System"];
        // Print System category
        helpInfoEmbed.addField(":desktop: **Server:**","```" + printCommands(remove,allCommandsInfo) + "```", true);
      }
    }
    helpInfoEmbed.addField("\u200B","\u200B",true);
    helpInfoEmbed.addField("\u200B","\u200B",true);
    message.channel.send(helpInfoEmbed);

  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      helpInfoEmbed.setTitle("Command: `"+command.help.name+"`");
      helpInfoEmbed.setDescription(command.help.description);
      helpInfoEmbed.addField("**Command Aliases:**",`\`${command.conf.aliases.join("`, `")}\``);
      helpInfoEmbed.addField("**Usage Example:**",`${command.help.usage}`);
      helpInfoEmbed.setFooter("© Midday","https://avatars0.githubusercontent.com/u/33847796?s=200&v=4");
      message.channel.send(helpInfoEmbed);

      //message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["h","hp"],
  permLevel: "User",
  cooldown: 5
};

exports.help = {
  name: "help",
  category: "System",
  description: "Outputs a list of commands the bot can execute.",
  usage: "`help` or `help [command]`"
};
