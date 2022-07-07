import { Config, ConfigHelper } from './src/Configuration';
var configHelper = new ConfigHelper();
new Config('./data/GlobalConfig.json');

import { changePrefix, PerUserConfig } from './src/PerUserConfig';
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

client.on('messageCreate', (message) => {
    //prepare user folder
    if(!message.author.bot)
    {
        var fixedUserPath = path.join(".", "users", message.author.id);
        if(!fs.existsSync(fixedUserPath)){ fs.mkdirSync(fixedUserPath); }
    }

    var prefixIndexer = `${message.author.id}prefix`;
    var prefix = configHelper.getValue(prefixIndexer);

    if(prefix == null && !message.author.bot)
    {
        //we set the default prefix as the prefix in order to execute the command without any problem
        prefix = configHelper.getValue("defaultPrefix");
        //we create the config for that user and the command is executed without any problem as we set the user prefix temporarily as the default prefix
        perUserConfig.createConfig(message.author.id);
    }
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).split(" ");

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

    if(args[0] === "pfp")
    {
        var pfpEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author!.tag} profile picture`)
        .setImage(message.author!.avatarURL({size: 4096, format: 'png'})!.toString());
        message.channel.send({embeds: [pfpEmbed]});
    }

    if(args[0] === "settings")
    {
        var userSettingsEmbed = new Discord.MessageEmbed()
        .setTitle('Your settings')
        .setColor('BLURPLE');

        userSettingsEmbed.addField('Your prefix is: ', `${prefix}`);

        message.reply({embeds: [userSettingsEmbed]});
    }

    if(args[0] === "change")
    {
        if(args[1] == null || args[1] == "") message.reply("Specify a setting to change bruh");
        
        switch(args[1])
        {
            case "prefix":

                var newPrefix = new Discord.MessageEmbed().setColor('GREEN');

                if(args[2] == null || args[2] == "")
                { 
                    changePrefix(message.author.id, configHelper.getValue("defaultPrefix"));
                    newPrefix.setTitle("Your prefix is now the default prefix (s?)");
                    message.reply({embeds: [newPrefix]});
                }
                else 
                {
                    changePrefix(message.author.id, args[2]);
                    newPrefix.setTitle("Your prefix is now: " + prefix)
                    message.reply({embeds: [newPrefix]});
                }
            break;
        }
    }

    if(args[0] === "shutdown")
    {
        client.destroy();
        process.exit();
    }
});

client.login(token);

new LoggingHandler(client);