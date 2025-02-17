import { client } from "../../bot";
import rpc from "../../utils/richPresence";
import logger from "../../utils/logger";

module.exports = {
  name: "stopactivity",
  aliases: ["stopactivity", "clearactivity"],
  info: "clears the user's current activity",
  usage: "stopactivity",
  async execute(message: any, args: any) {
    await client.user.setActivity(null);
    message.delete();

    message.chanel.send("Activity cleared.");
    logger.status("Activity cleared.");
    await rpc(client);
  },
};
