const { WebhookClient, Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const moment = require("moment");
const config = require("./../config.js");
const wait = require("util").promisify(setTimeout);
// Create the webhook that publishes the vents.
const ventClient = new WebhookClient({ id: config.venterhook[0], token: config.venterhook[1] });

// Create the webhook that logs the vent message and author.
const revealClient = new WebhookClient({ id: config.revealerhook[0], token: config.revealerhook[1] });

exports.run = async (client, interaction) => {
  // Vent ID Generator
  const idGenerator = () => {return Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);};

  // Variable to check wether words that require intervention are found
  let activeWordsFound = false;

  // Create the modal
  const modal = new ModalBuilder()
    .setCustomId("myVent")
    .setTitle("Post an anonymous vent");

  // Add components to modal
  // Create the text input components
  const ventTitleInput = new TextInputBuilder()
    .setCustomId("ventTitleInput")
    .setMaxLength(256)
    .setLabel("What do you want to title your vent?")
    .setStyle(TextInputStyle.Short);

  const ventBodyInput = new TextInputBuilder()
    .setCustomId("ventBodyInput")
    .setLabel("What's on your mind?")
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(4_000);

  // An action row only holds one text input, so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(ventTitleInput);
  const secondActionRow = new ActionRowBuilder().addComponents(ventBodyInput);

  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow);

  // Display the modal
  await interaction.showModal(modal);

  // Define a timestamp.
  const timestamp = `${moment().format("DD/MM/YYYY")} | ${moment().format("HH:mm:ss (Z)")}`;

  // Create the default body of a successful submission.
  let replyText = "Your message was successfully posted.";

  client.on(Events.InteractionCreate, async interaction => {
    // Guard to make sure we only receive modals.
    if (!interaction.isModalSubmit()) return;

    // Create a random ID.
    const ventID = idGenerator();

    // Check if the modal ID is the correct one.
    if (interaction.customId === "myVent") {

      // Try to catch any errors
      try {
        // Get the title entered by the user
        const ventTitle = interaction.fields.getTextInputValue("ventTitleInput");

        // Get the body entered by the user
        const ventBody = interaction.fields.getTextInputValue("ventBodyInput");

        // Defer the reply to show the bot has recieved the command
        await interaction.deferReply();

        // Send initial reply showing that the vent is procesing
        await interaction.editReply({embeds: [{author: {name: "Processing...",icon_url: "https://cdn.discordapp.com/emojis/717875601964269658.gif"},color: 16763904,footer: {text: "Vent ID: " + ventID},timestamp: new Date().toISOString()}],ephemeral: true});
        await wait(1000);

        // Check if a support message should be sent
        if (interaction.fields.getTextInputValue("ventBodyInput").includes("suicid")) {
          // Redefine the message body to a helpful message
          replyText = "Your message was successfully posted.\n \n**If you are having suicidal thoughts please reach out to your country's suicide hotline.** Always remember that there are phone numbers that you can call *24 hours a day, 7 days a week*, from any location.\n\nYou **are** worthy, you **are** loved and you will **always** be able to find assistance.\n**You are not alone**. Please reach out.\n \n:united_nations: International Helpline: `116 123`\nFor a bigger list visit <#381838613559902208>";
          // Reply to the command with the success and helpful message
          await interaction.editReply({embeds: [{author: {name: "Success",icon_url: "https://cdn.discordapp.com/emojis/710291841639252017.webp"},description: replyText,color: 16763904,footer: {text: "Vent ID: " + ventID},timestamp: new Date().toISOString()}],ephemeral: true});
          // Set the valuable to true to show in the logs a help message was sent
          activeWordsFound = true;
        } else {
          // If it does not contain worrying words, then pass the vent along
          await interaction.editReply({embeds: [{author: {name: "Success",icon_url: "https://cdn.discordapp.com/emojis/710291841639252017.webp"},description: replyText,color: 6076508,footer: {text: "Vent ID: " + ventID},timestamp: new Date().toISOString()}],ephemeral: true});
        }

        // Send Vent
        ventClient.send({embeds: [{title: ventTitle,description: ventBody,color: 16711422,footer: {text: "Vent ID: " + ventID}}]});

        // Send the message to the webhook that posts it to #vents-log
        revealClient.send("```asciidoc\nTIMESTAMP::" +timestamp +"\nAUTHOR:: " +interaction.user.globalName +" (" +interaction.user.id +")\n" +"TITLE:: " +ventTitle +"\nMESSAGE:: " +ventBody +"\nVENT ID:: " +ventID +"\nHELPSENT:: " +activeWordsFound +"```");

      } catch (error) {
        // Catch any errors (ESPECIALLY THE UNKNOWN INTERACTION)
        console.error("Error showing modal: ", error.rawError.message, "\nThis is fine and the cause is unknown.");
      }
    }    
  });
};

exports.commandData = {
  name: "vent",
  description: "Command used to send anonymous messages to #vents",
  options: [],
  defaultPermission: true,
};

// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel: "User",
  guildOnly: false
};
