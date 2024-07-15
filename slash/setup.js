const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField} = require("discord.js");
const { settings } = require("../modules/settings.js");
//const { log } = require("../modules/logger.js");

exports.run = async (client, interaction) => {
  // eslint-disable-line no-unused-vars
  const confirm = new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("Begin Setup")
    .setStyle(ButtonStyle.Success);

  const cancel = new ButtonBuilder()
    .setCustomId("cancel")
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Danger);

  const server = new ButtonBuilder()
    .setLabel("Venter Server")
    .setURL("https://discord.gg/EBTkQHg")
    .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder()
    .addComponents(confirm, cancel, server);

  const successRow = new ActionRowBuilder()
    .addComponents(server);

  if (!settings.has(interaction.guild.id)) settings.set(interaction.guild.id, {});

  let welcomeEmbed = new EmbedBuilder()
    .setTitle("Venter Setup:")
    .setDescription("Hey there, and thank you for trying to set up Venter! \nTo get started, we need to create a channel and a webhook for the bot to use. Please click the button below to begin creation. Your member's vents will be sent to our publicly available server too, so that they can be read by others. If you would like to join the server, click the link below.\n\n If there is a channel already named 'vents' on this server, the bot will ignore it and create new one.")
    .setColor(16711422);
  
  const overrides = settings.get(interaction.guild.id);

  console.log(overrides["ownVenterChannelID"]);
  
  //if (interaction.guild.channels.fetch(overrides["ownVenterChannelID"]) !== null) {
    //welcomeEmbed = new EmbedBuilder()
     // .setTitle("Venter Setup:")
      //.setDescription("Hey there, and thank you for trying to set up Venter! \nTo get started, we need to create a channel and a webhook for the bot to use. Please click the button below to confirm. Your member's vents will be sent to our publicly available server too, so that they can be read by others. If you would like to join the server, click the link below.")
     // .setFooter({ text: "WARNING: A vent channel has already been cached on this server. Continuing with setup will create another one. If you have already deleted the venting channel you can ignore this message." })
    //  .setColor(16711422);
  //}
  const question = await interaction.reply(({
    embeds: [welcomeEmbed],
    ephemeral: true,
    components: [row],
  }));

  const collectorFilter = i => i.user.id === interaction.user.id;
  try {
    const confirmation = await question.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

    if (confirmation.customId === "confirm") {
      
      try {
        await interaction.guild.channels.create({
          name: "vents",
          reason: "Vents channel needed for venting setup. Action began by "+interaction.user.tag+"",
          permissionOverwrites:
          [
            {
              id: interaction.guild.roles.everyone.id,
              allow: [PermissionsBitField.Flags.ReadMessageHistory],
              deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.CreatePublicThreads],
            },
          ],
        }).then(
          (TextChannel) => {
            console.log("TEXT CHANNEL ID: "+TextChannel.id);
            settings.set(interaction.guild.id, TextChannel.id, "ownVenterChannelID");
          });
        
        await confirmation.update({
          embeds: [
            {
              title: "Venter Setup:",
              description: "Channel & Webhook created. Your venting channel is now ready to use.",
              color: 3250249,
            },
          ],
          components: [successRow]
        });

      } catch (error) {
        console.log(error);
        await interaction.editReply({
          embeds: [
            {
              title: "Venter Setup: Error",
              description: "Your channel could not be created! Please check if the bot has the necessary permissions!",
              color: 15083830,
            },
          ],
          components: []
        });
      }
    
      const overrides = settings.get(interaction.guild.id);
    
      await interaction.guild.channels.createWebhook({
        channel: overrides["ownVenterChannelID"],
        name: "Venter",
        avatar: "https://cdn.discordapp.com/app-icons/849364742555303966/bae69f9caaa12d893e6cac0aa5b4b365.png?size=512",
        reason: "Webhook needed for venting setup. Action began by "+interaction.user.tag+""
      }).then(
        (webhook) => {
          settings.set(interaction.guild.id, webhook.id, "ownVenterHookID");
          settings.set(interaction.guild.id, webhook.token, "ownVenterHookTK") ;
        });
      //await confirmation.update({ content: `${target.username} has been banned for reason: ${reason}`, components: [] });
    } else if (confirmation.customId === "cancel") {
      await confirmation.update({
        embeds: [
          {
            title: "Venter Setup: Cancelled",
            description: "Venter setup cancelled.",
            color: 15083830,
          },
        ],
        components: [] });
    }
  } catch (e) {
    await interaction.editReply({
      embeds: [
        {
          title: "Venter Setup: Timed Out",
          description: "Confirmation not received within 1 minute, setup cancelled.",
          color: 15083830,
        },
      ],
      components: [] });
  }

  //await interaction.deferReply();

};
  
exports.commandData = {
  name: "setup",
  description: "Set up venting in your server.",
  options: [],
  defaultPermission: true,
};
  
// Set guildOnly to true if you want it to be available on guilds only.
// Otherwise false is global.
exports.conf = {
  permLevel: "Administrator",
  guildOnly: true,
};