const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'unban',
  aliases: ['revokeBan', 'unbanuser'],
  async execute(message, args) {
    await message.delete();
    const userId = args[0];
    if (!userId) {
      return message.reply("❌ Please provide the ID of the user to unban.");
    }

    try {
      const unbannedUser = await message.guild.members.unban(userId);
      message.channel.send(`✅ ${unbannedUser.username} has been unbanned.`);
      log("Unbanned user with ID: " + userId);
    } catch (error) {
      message.channel.send("❌ Failed to unban the user. Please check the ID or permissions.");
      log("Error unbanning user with ID: " + userId + " - " + error.message);
    }
  }
};
