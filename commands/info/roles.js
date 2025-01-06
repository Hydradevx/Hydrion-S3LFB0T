const { log } = require('../../utils/logger.js') 

module.exports = {
  name: 'roles',
  aliases: ['listroles', 'roleslist'],
  execute(message, args) {
    message.delete();

    const user = message.mentions.users.first() || args[0];
    if (!user) return message.channel.send("Please mention a user to list roles.");

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.channel.send("User not found in the server.");

    const roles = member.roles.cache
      .filter(role => role.name !== '@everyone') 
      .map(role => role.name)
      .join(", "); 

    if (roles.length === 0) {
      return message.channel.send(`👤 **Roles for ${user.username}:** This user has no roles.`);
    }

    message.channel.send(`👤 **Roles for ${user.username}:** ${roles}`);
    log(`Roles command has been executed on ${user.username} and Roles are ${roles}`)
  }
};
