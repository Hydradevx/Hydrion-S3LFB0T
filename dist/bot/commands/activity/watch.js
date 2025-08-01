import { client } from "../../../bot.js";
import logger from "../../utils/logger.js";
export default {
    name: "watch",
    aliases: ["startwatch", "setwatch"],
    info: "sets the user's watching status",
    usage: "watch [watching title]",
    async execute(message, args) {
        await client.user.setActivity(null);
        message.delete();
        const activityDescription = args.join(" ");
        if (activityDescription) {
            await client.user.setActivity(activityDescription, { type: "WATCHING" });
            message.channel.send(`📺  ${message.isOwnMessage ? "You are" : "I am"} now watching **${activityDescription}**!`);
            logger.status(`Watching set with title: ${activityDescription}`);
        }
        else {
            message.channel.send("❌ Please provide a title to watch.");
        }
    },
};
