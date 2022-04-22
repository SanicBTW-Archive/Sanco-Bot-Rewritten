import Discord from 'discord.js';
const intents = new Discord.Intents(32767);
export var client:Discord.Client = new Discord.Client({intents})!;
import {token} from './src/data/secrets/Token.json';
import * as readline from 'readline';
export var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
import {Logger} from './src/NewLogger';
import {InitFunctions} from './src/terminal/ConfHandler';
import {InitConsoleCommands} from './src/terminal/TermHandler';
import {prefix, presName} from './src/data/config/DConf.json';
import {requestNote, startServer, url, urlReq, started} from './src/server/server';
import fetch, {Response} from 'node-fetch';

//startServer();

client.on('ready', async () => {
    await InitFunctions().then(() => {
        Logger(`Logged in as ${client.user!.tag}`, "INFO");
        client.user!.setPresence({
            activities:[{
                name: presName,
                type: 'PLAYING'
            }], status: "dnd"
        })
        InitConsoleCommands();
    });
});

client.on('messageCreate', async(message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).split(" ");

    if(args[0] === "ping")
    {
        const calcping = new Discord.MessageEmbed()
        .setTitle('Calculando el ping...');

        let serverstate:Response;
        var gaveErr:boolean;
        var givenErr:any;
        try
        {
            serverstate = await fetch(`${url}`);
            gaveErr = false;
        }
        catch(error)
        {
            gaveErr = true;
            givenErr = error;
        }

        message.channel.send({embeds:[calcping]}).then(resultMessage => {
            const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;

            const pingresult = new Discord.MessageEmbed()
            .setTitle('Pong! :ping_pong:')
            .addFields
            (
                { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true},
            ).setColor('GREEN');

            if(gaveErr == false)
            {
                pingresult.addField('Estado del servidor ', `${serverstate.statusText}/${serverstate.status}`, true)
            }
            else
            {
                pingresult.addField('No se ha podido contactar con el servidor', `${givenErr}`, false);
                pingresult.setColor('ORANGE');
            }

            resultMessage.edit({embeds: [pingresult]});
        });
    }
    if(args[0] === "req")
    {
        var respEmbed = await requestNote(args[1], args[2]);
        message.channel.send({embeds:[respEmbed]});
    }
    if(args[0] === "submit")
    {
        //heavily based off some stack overflow question: https://stackoverflow.com/questions/67652628/reading-file-attachments-ex-txt-file-discord-js
        const file = message.attachments.first()?.url;
        if(!file) return Logger("no attached file found", "WARNING");
        try
        {
            message.reply("Leyendo el archivo");
            const resp = await fetch(file);
            if(!resp.ok){
                message.reply(resp.statusText);
            }
            const textFile = await resp.text();
            if(textFile){
                message.channel.send(`\`\`\`${textFile}\`\`\``);
            }
        }
        catch (excp)
        {
            Logger(excp, "ERROR");
        }
    }
    if(args[0] === "exit")
    {
        client.destroy();
        process.exit();
    }
});

client.login(token);