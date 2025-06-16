import { Client } from 'discord.js-selfbot-v13';
import { Client_Type } from '../utils/types.js';

const client: Client_Type = new Client();

function login(token: string) {
  client.login(token);
}

export { client, login };