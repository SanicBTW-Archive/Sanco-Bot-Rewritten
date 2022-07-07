import { Config, ConfigHelper } from './src/Configuration';
var configHelper = new ConfigHelper();
new Config('./data/GlobalConfig.json');

import { PerUserConfig } from './src/PerUserConfig';
export var perUserConfig = new PerUserConfig();

import Discord from 'discord.js';
const intents = new Discord.Intents(32767);
export var client:Discord.Client = new Discord.Client({intents})!;
import {token} from './data/Token.json';
import * as readline from 'readline';
export var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
import {InitFunctions} from './src/terminal/FuncLoader';
import {InitConsoleCommands} from './src/terminal/TermHandler';
import {LoggingHandler} from './src/Logger';
import { CommandData, CommandHelper, commandNames } from "./src/CommandData";

client.on('ready', async () => {
    await InitFunctions().then(() => {
        console.log(`Logged in as ${client.user!.tag}`);
        client.user!.setPresence({
            activities:[{
                name: configHelper.getValue("presenceName"),
                type: 'PLAYING'
            }], status: "dnd"
        })
        InitConsoleCommands();
    });
});

new LoggingHandler(client);

var commandHelper = new CommandHelper();
new CommandData('./commands');

/*
client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).split(" ");

    perUserConfig.init(message.author.id);

    if(args[0] === "ping")
    {
    }

    //temp command lol
    if(args[0] === "pfp")
    {
        var pfp = message.author.avatarURL({size: 4096, format: 'png'});
        message.channel.send(pfp!);
    }

    if(args[0] === "shutdown")
    {
        client.destroy();
        process.exit();
    }
});*/

client.login(token);