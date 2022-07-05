import { Config, ConfigHelper } from './src/ConfigHandler';
var configHelper = new ConfigHelper();
new Config('./data/GlobalConfig.json');

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
import {InitFunctions} from './src/terminal/ConfHandler';
import {InitConsoleCommands} from './src/terminal/TermHandler';
import {eventHandler} from './src/EventHandler';
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

new eventHandler(client);

client.on('messageCreate', async(message) => {
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

    if(args[0] === "shutdown")
    {
        client.destroy();
        process.exit();
    }
});

client.login(token);