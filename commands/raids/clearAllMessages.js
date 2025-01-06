const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'clearAllMessages',
  aliases: ['clearAll', 'massClear'], 
  async execute(message) {
    await message.delete();

    const confirmMessage = await message.channel.send("⚠️ Are you sure you want to delete **ALL MESSAGES** in all channels? Type `confirm` to proceed.");

    const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all messages in all channels...");

      message.guild.channels.cache
        .filter(channel => channel.isText())
        .forEach(channel => {
          channel.messages.fetch({ limit: 100 }).then(messages => { 
            messages.forEach(msg => msg.delete().catch(console.error));
          });
        });

      confirmMessage.edit("✅ All messages deleted.");
      log("All messages deleted in all channels by user.");
    });
  }
};
