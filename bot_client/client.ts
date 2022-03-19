import Discord, { Intents } from 'discord.js';
var client:Discord.Client = new Discord.Client({intents: Intents.FLAGS.GUILDS})!;
import {token} from './src/secrets/Token.json';
import * as readline from 'readline';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>>"
});
import {Logger} from './src/NewLogger';
import {InitFunctions} from './src/terminal/CHandler';

client.on('ready', async () => {
    Logger("Logged in", "INFO");
    
});

client.login(token);