import logger from "../../utils/logger";

module.exports = {
  name: "pfp",
  aliases: ["pf"],
  info: "shows a user's profile picture",
  usage: "pfp [@user]",
  execute(message: any, args: any) {
    const user = message.mentions.users.first() || args[0] || message.author;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    message.channel.send(`
      ${user.username}'s Profile Picture
      \n
      ${avatar}
    `);
    logger.cmd(`Pfp command has been executed on ${user.username}`);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};
