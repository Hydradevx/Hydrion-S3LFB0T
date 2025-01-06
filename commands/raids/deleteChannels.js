const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'deleteChannels',
  aliases: ['dChannels', 'deleteC'],
  async execute(message) {
    await message.delete();

    const confirmMessage = await message.channel.send("⚠️ Are you sure you want to delete **ALL** channels? Type `confirm` to proceed.");

    const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all channels...");

      message.guild.channels.cache.forEach(channel => channel.delete().catch(console.error));
      confirmMessage.edit("✅ All channels deleted.");

      log("All channels deleted by user.");
    });
  }
};
