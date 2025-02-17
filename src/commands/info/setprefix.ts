import logger from "../../utils/logger";
import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

module.exports = {
  name: "setprefix",
  aliases: ["changeprefix"],
  info: "changes the prefix for the bot",
  usage: "setprefix [new prefix]",
  async execute(message: any, args: any) {
    if (args.length === 0) {
      message.channel.send("Please provide a new prefix.");
      return;
    }

    const newPrefix = args[0];

    config.prefix = newPrefix;

    fs.writeFile(
      "../../config.json",
      JSON.stringify(config, null, 2),
      (err) => {
        if (err) {
          logger.error(`Error updating prefix: ${err}`);
          message.channel.send("An error occurred while updating the prefix.");
          return;
        }

        logger.cmd(`Prefix updated to: ${newPrefix}`);
        message.channel.send(`Prefix has been updated to: \`${newPrefix}\``);
      },
    );

    message.delete();
  },
};
