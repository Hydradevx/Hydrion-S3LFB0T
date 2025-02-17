import logger from "../../utils/logger";

module.exports = {
  name: "quote",
  aliases: ["addquote"],
  info: "quotes your message",
  usage: "qoute [message]",
  async execute(message: any, args: any) {
    message.delete();
    const quote = args.join(" ");

    if (!quote) return message.channel.send("❌ Please provide a quote.");

    message.channel.send(`💬 **Quote:** "${quote}"`);
    logger.cmd(`Quote added: "${quote}"`);
  },
};
