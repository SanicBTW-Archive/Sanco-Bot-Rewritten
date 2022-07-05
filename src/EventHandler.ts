import Discord from 'discord.js';
import { rl } from '..';
import path from 'path';
import fs from 'fs';
import { writeFile } from './Helper';
import { ConfigHelper } from './ConfigHandler';

var logsDir:string = path.join('.', 'logs');
var authorDir:string = "";
var messagesDir:string = "";
var fileExt:string = ".json";
var doneSettingUp:boolean = false;
var configHelper = new ConfigHelper();

var details:MessageDetails = 
{
    "detailsVersion": 1.1,
    "author": "author name",
    "authorID": "author id",
    "content": "message content",
    "channelID": "channel id"
}

export class eventHandler
{
    constructor(client:Discord.Client)
    {
        client.on('messageCreate', async(msg) =>
        {
            if(msg.author.bot) return;

            details.author = msg.author.username;
            details.authorID = msg.author.id;
            details.content = msg.content;
            details.channelID = msg.channelId;

            if(configHelper.getValue("save message logs"))
            {
                setupFolders();

                var stringifiedMessage = JSON.stringify(details, null, 4); 
                var fixedDir = path.join(messagesDir, msg.createdAt.toUTCString() + fileExt);
    
                if(doneSettingUp)
                {
                    writeFile(fixedDir, stringifiedMessage);
                }
            }

            rl.prompt();
        });
    }
}

function setupFolders()
{
    authorDir = path.join(logsDir, details.authorID) //we use the id to create the folder to avoid emojis or any special characters
    messagesDir = path.join(authorDir, "messages");
    if(!fs.existsSync(authorDir)){ fs.mkdirSync(authorDir); }
    if(!fs.existsSync(messagesDir)) { fs.mkdirSync(messagesDir); }
    doneSettingUp = true;
}

type MessageDetails = 
{
    detailsVersion: number,
    author:string,
    authorID:string,
    content:string | never,
    channelID:string
}