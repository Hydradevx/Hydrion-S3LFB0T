import { client } from "../../../bot.js";
import logger from "../../utils/logger.js";
export default {
    name: "stream",
    aliases: ["startstream", "setstream"],
    info: "sets the user's streaming status",
    usage: "stream [streaming description]",
    async execute(message, args) {
        message.delete();
        const activityDescription = args.join(" ");
        if (activityDescription) {
            await client.user.setActivity(activityDescription, {
                type: "STREAMING",
                url: "https://www.twitch.tv/your_channel",
            });
            message.channel.send(`🎥 You are now streaming **${activityDescription}**!`);
            logger.status(`Streaming set with title: ${activityDescription}`);
        }
        else {
            message.channel.send("❌ Please provide a streaming description.");
        }
    },
};
