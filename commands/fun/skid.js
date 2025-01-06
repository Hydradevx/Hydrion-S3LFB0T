const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'skid',
  aliases: ['ski', 'sk'],
  execute(message, args) {
    const userToCheck = message.mentions.users.first() || args[0] || message.author;

    message.channel.send(`Analyzing ${userToCheck.username}'s skid level...`).then(skidcheckMessage => {
        const finalPercentage = getRandomPercentage();
        const messages = [
            `Are you a skid, ${userToCheck.username}? 🤔`,
            `Hmmm... You might be a skid, ${userToCheck.username}! 👀`,
            `I'm getting some skid vibes from you, ${userToCheck.username}... 😳`,
            `Yeah, you're looking pretty skid, ${userToCheck.username}... 💻`,
            `Calculating final skid level... 🔄`
        ];

        let editCount = 0;

        const editInterval = setInterval(async () => {
            if (editCount < messages.length) {
                await skidcheckMessage.edit(messages[editCount]);
                editCount++;
            } else {
                let skidResultMessage;
                if (finalPercentage <= 20) {
                    skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. True coding sigma 🔥.`;
                } else if (finalPercentage <= 40) {
                    skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. A touch of skid vibes 💻.`;
                } else if (finalPercentage <= 60) {
                    skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. You've got balanced skills 🚀.`;
                } else if (finalPercentage <= 80) {
                    skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. Treading the skid path 👾.`;
                } else {
                    skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. Heavy skid energy detected 🧑‍💻.`;
                }

                await skidcheckMessage.edit(skidResultMessage);
                clearInterval(editInterval);
            }
        }, 1000);

        message.delete();
        log(`Skid Command has been executed on ${userToCheck.username} and Result is ${finalPercentage}%`);
    });
  }
}

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}
