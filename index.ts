import Discord, { Intents } from 'discord.js';
const intents = new Discord.Intents(32767);
var client:Discord.Client = new Discord.Client({intents})!;
import {token} from './src/data/secrets/Token.json';
import * as readline from 'readline';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
import {Logger} from './src/NewLogger';
import {InitFunctions} from './src/terminal/ConfHandler';
import {InitConsoleCommands} from './src/terminal/TermHandler';
import {prefix, presName} from './src/data/config/DConf.json';
import {requestNote, startServer, url, urlReq} from './server/server';

startServer();

client.on('ready', async () => {
    await InitFunctions().then(() => {
        Logger(`Logged in as ${client.user!.tag}`, "INFO");
        client.user!.setPresence({
            activities:[{
                name: presName,
                type: 'PLAYING'
            }], status: "dnd"
        })
        InitConsoleCommands(client, rl);
    });
});

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
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true}
            ).setColor('#008000');

            resultMessage.edit({embeds: [pingresult]});
        });
    }
    if(args[0] === "req")
    {
        var jijija = args[1];
        var respEmbed = await requestNote(jijija);
        message.channel.send({embeds:[respEmbed]});
    }
});

client.login(token);