const { log } = require('../../utils/logger');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  execute(message) {
    message.channel.send(`🏓 Your Ping is ${message.createdTimestamp - Date.now()}ms!`);
    log(`Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms`);
    message.delete();
  }
};