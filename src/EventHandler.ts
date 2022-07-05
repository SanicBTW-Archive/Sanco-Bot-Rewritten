import Discord from 'discord.js';
import { rl } from '..';
import path from 'path';
import fs from 'fs';
import { writeFile } from './Helper';
import { ConfigHelper } from './ConfigHandler';

var logsDir:string = path.join('.', 'logs');
var authorDir:string = "";
var messagesDir:string = "";
var editedMessagesDir:string = "";
var fileExt:string = ".json";
var configHelper = new ConfigHelper();

configHelper.setNewValue("messages dir done", false);
configHelper.setNewValue("edited messages dir done", false);

var messageDetails:MessageDetails = 
{
    "version": 1.2,
    "author": "author name",
    "authorID": "author id",
    "content": "message content",
    "guild": "guild",
    "channelID": "channel id"
}

var editedMessageDetails:EditedMessageDetails = 
{
    "version": 1,
    "author": "author name",
    "authorID": "author id",
    "oldContent": "old message content",
    "newContent": "new message content",
    "guild": "guild",
    "channelID": "channel id",
}

export class EventHandler
{
    constructor(client:Discord.Client)
    {
        client.on('messageCreate', (msg) =>
        {
            if(msg.author?.bot) return;

            messageDetails.author = msg.author.username;
            messageDetails.authorID = msg.author.id;
            messageDetails.content = msg.content;
            messageDetails.guild = msg.guild?.name;
            messageDetails.channelID = msg.channelId;

            if(configHelper.getValue("save message logs"))
            {
                setupMessagesFolder();

                var stringifiedMessage = JSON.stringify(messageDetails, null, 4); 
                var fixedDir = path.join(messagesDir, msg.createdAt.toUTCString() + fileExt);
    
                if(configHelper.getValue("messages dir done"))
                {
                    writeFile(fixedDir, stringifiedMessage);
                }
            }

            rl.prompt();
        });

        //this one might need a little bit of tweaking tbh
        client.on('messageUpdate', (oldMsg, newMsg) => {
            if(newMsg.author?.bot) return;

            //the message is edited by the same person sooo it doesnt matter if oldMsg or newMsg is used
            editedMessageDetails.author = newMsg.author!.username;
            editedMessageDetails.authorID = newMsg.author!.id;
            editedMessageDetails.oldContent = oldMsg.content;
            editedMessageDetails.newContent = newMsg.content;
            editedMessageDetails.guild = newMsg.guild?.name;
            editedMessageDetails.channelID = newMsg.channelId;

            if(configHelper.getValue("save edited messages"))
            {
                setupEditedMessagesFolder();

                var stringifiedEditedMessage = JSON.stringify(editedMessageDetails, null, 4);
                var fixedDir = path.join(editedMessagesDir, newMsg.createdAt.toUTCString() + fileExt);
                
                if(configHelper.getValue("edited messages dir done"))
                {
                    writeFile(fixedDir, stringifiedEditedMessage);
                }
            }

            rl.prompt();
        });
    }
}

//we use the id to create the folder to avoid emojis or any special characters
function setupMessagesFolder()
{
    authorDir = path.join(logsDir, messageDetails.authorID);
    messagesDir = path.join(authorDir, "messages");
    if(!fs.existsSync(authorDir)){ fs.mkdirSync(authorDir); }
    if(!fs.existsSync(messagesDir)) { fs.mkdirSync(messagesDir); }
    configHelper.setNewValue("messages dir done", true);
}

function setupEditedMessagesFolder()
{
    authorDir = path.join(logsDir, editedMessageDetails.authorID);
    editedMessagesDir = path.join(authorDir, "edited_messages");
    if(!fs.existsSync(authorDir)){ fs.mkdirSync(authorDir); }
    if(!fs.existsSync(editedMessagesDir)){ fs.mkdirSync(editedMessagesDir); }
    configHelper.setNewValue("edited messages dir done", true);
}

type MessageDetails = 
{
    version: number,
    author:string,
    authorID:string,
    content:string | never,
    guild:string | undefined,
    channelID:string
}

type EditedMessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    oldContent: string | null,
    newContent: string | null,
    guild:string | undefined,
    channelID:string
}