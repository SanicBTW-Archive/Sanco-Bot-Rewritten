import Discord from 'discord.js';
import { rl } from '..';
import path from 'path';
import fs from 'fs';
import { createDirectory, writeFile } from './Helper';

var logsDir:string = path.join('.', 'logs');
var authorDir:string = "";
var messagesDir:string = "";
var fileExt:string = ".json";

export var pushedDetails:any = [];

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
        client.on('messageCreate', async(msg) => {
            if(msg.author.bot) return;

            details.author = msg.author.username;
            details.authorID = msg.author.id;
            details.content = msg.content;
            //this is actually useless too as we have it in the file name lol, maybe i could put timestamp instead of date, or something duno
            //details.creationDate = msg.createdAt.toUTCString();
            //guild is actually useless as we are literally logging messages from only one guild which we already know lol
            //details.guild = msg.guild?.name;
            details.channelID = msg.channelId;

            authorDir = path.join(logsDir, details.authorID) //we use the id to create the folder to avoid emojis or any special characters
            messagesDir = path.join(authorDir, "messages");
            createDirectory(authorDir);
            createDirectory(messagesDir);

            var stringifiedMessage = JSON.stringify(details, null, 4); 
            var fixedDir = path.join(messagesDir, msg.createdAt.toUTCString() + fileExt);
            writeFile(fixedDir, stringifiedMessage);

            rl.prompt();
        });
    }
}


type MessageDetails = 
{
    detailsVersion: number,
    author:string,
    authorID:string,
    content:string | never,
    channelID:string
}