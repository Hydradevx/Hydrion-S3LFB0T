import logger from "../../utils/logger";

module.exports = {
  name: "roles",
  aliases: ["listroles", "roleslist"],
  info: "lists roles of a user",
  usage: "roles [@user]",
  execute(message: any, args: any) {
    message.delete();

    const user = message.mentions.users.first() || args[0];
    if (!user)
      return message.channel.send("Please mention a user to list roles.");

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.channel.send("User not found in the server.");

    const roles = member.roles.cache
      .filter((role: any) => role.name !== "@everyone")
      .map((role: any) => role.name)
      .join(", ");

    message.channel.send(
      `👤 **Roles for ${user.username}:** ${
        roles.length == 0 ? "None of them lol" : roles
      }`,
    );
    logger.cmd(
      `Roles command has been executed on ${user.username} and Roles are ${roles}`,
    );
  },
};
