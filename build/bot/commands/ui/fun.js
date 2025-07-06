import logger from "../../utils/logger";
export default {
    name: "fun",
    aliases: ["f"],
    execute(message, args, client, prefix) {
        const page = args[0] || 1;
        message.channel.send(loadFunMsg(page, prefix));
        logger.cmd(`Fun Command executed, page: ${page}`);
        message.delete();
    },
};
function loadFunMsg(page, prefix) {
    if (page == 1) {
        return `
> ## 🎲 **Fun Commands - Page 1** 🎲
> 🎱 **${prefix}8ball**
> 🪙 **${prefix}coinflip**
> 🌈 **${prefix}gay**
> 🤣 **${prefix}joke**
> 🖼️ **${prefix}meme**
> 💬 **${prefix}rizz**
> 🚀 **${prefix}skid**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
    }
    else {
        return `> ✨ **More Commands Coming Soon!** ✨`;
    }
}
