import Discord from 'discord.js';
import { Logger } from './NewLogger';
import { rl } from '..';
import path from 'path';
import fs from 'fs';

var logsDir:string = path.join('.', 'logs');
var authorDir:string = "";
var messagesDir:string = "";

export var pushedDetails:any = [];

var details:MessageDetails = 
{
    "author": "author name",
    "authorID": "author id",
    "content": "message content",
    "creationDate": "creation date",
    "guild": "guild",
    "channelID": "channel id"
}

export class eventHandler
{
    constructor(client:Discord.Client)
    {
        client.on('messageCreate', async(msg) => {
            if(msg.author.bot) return;

            details.author = msg.author.username;
            details.authorID = msg.author.id;
            details.content = msg.content;
            details.creationDate = msg.createdAt.toUTCString();
            details.guild = msg.guild?.name;
            details.channelID = msg.channelId;

            authorDir = path.join(logsDir, details.authorID) //we use the id to create the folder to avoid emojis or any special characters
            messagesDir = path.join(authorDir, "messages");
            fs.mkdirSync(authorDir);
            fs.mkdirSync(messagesDir);

            rl.prompt();
        });
    }
}


type MessageDetails = 
{
    author:string,
    authorID:string,
    content:string | never,
    creationDate:string,
    guild:string | undefined,
    channelID:string
}