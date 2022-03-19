import Discord, { Intents } from 'discord.js';
var client:Discord.Client = new Discord.Client({intents: Intents.FLAGS.GUILDS})!;
import {token} from './src/Secrets/Token.json';
import * as readline from 'readline';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>>"
});

client.on('ready', async () => {
    console.log("Logged in");
});

client.login(token);