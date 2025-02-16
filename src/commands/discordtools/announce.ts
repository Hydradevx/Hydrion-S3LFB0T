module.exports = {
  name: "announce",
  aliases: ["announcement"],
  info: "announces a message in announcement Channel",
  usage: "announce [message]",
  /**
   *
   * @param {string[]} _args
   * @param {Client} client
   */
  async execute(message: any, args: any) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const announcement = args.join(" ").trim();
    if (!announcement) {
      message.sendMessage("❌ Please provide an announcement message.");
      return;
    }

    try {
      const announceChannel =
        message.guild.channels.cache.find(
          (ch: any) => ch.name.toLowerCase() === "annc",
        ) || message.mentions.channels.first();
      if (!announceChannel) {
        message.sendMessage("❌ Announcement channel not found.");
        return;
      }
      announceChannel.send(`📢 **Announcement:** ${announcement}`);
      console.log(`Announcement sent: ${announcement}`);
    } catch (error: any) {
      message.sendMessage("❌ Unable to send the announcement.");
      console.log(`Failed to send announcement: ${error.message}`);
    }
  },
};
