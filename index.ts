import { Config, ConfigHelper } from './src/Configuration';
var configHelper = new ConfigHelper();
new Config('./data/GlobalConfig.json');

import { PerUserConfig } from './src/PerUserConfig';
var perUserConfig = new PerUserConfig();

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
import path from 'path';
import fs from 'fs';
var prefix = configHelper.getValue("prefix");

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

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).split(" ");

    //runs every time a command is executed
    perUserConfig.init(message.author.id);

    if(args[0] === "ping")
    {
        const calcping = new Discord.MessageEmbed()
        .setTitle('Calculando el ping...');

        message.channel.send({embeds:[calcping]}).then(resultMessage => {
            const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;

            const pingresult = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true},
            ).setColor('GREEN');

            resultMessage.edit({embeds: [pingresult]});
        });
    }

    if(args[0] === "help")
    {
        var theCommandsDescFile = fs.readFileSync('./data/CommandsDesc.json', "utf-8");
        var fileParse = JSON.parse(theCommandsDescFile);
        var helpMenu = new Discord.MessageEmbed()
        .setTitle("Help Menu")
        .setColor('AQUA');
        
        var availableCommands = fileParse.commands;
        for(var i in availableCommands)
        {
            var command = availableCommands[i];
            var paths = fileParse.paths[command];
            var fixedPath = path.join(".", "data", "descriptions", paths);
            var contents:any = fs.readFileSync(fixedPath, 'utf-8').trim().split('\n');

            helpMenu.addField(command, `${contents[0]}\nCan be used by: ${contents[1]}`, false);
        }
        message.channel.send({embeds: [helpMenu]});
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
});

client.login(token);