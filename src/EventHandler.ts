import Discord from 'discord.js';
import { rl } from '..';
import path from 'path';
import fs from 'fs';
import { writeFile } from './Helper';
import { ConfigHelper } from './ConfigHandler';

var configHelper = new ConfigHelper();

var logsDir:string = path.join('.', 'logs');
//migrate to configHelper next commit
var messagesDir:string = "";
var editedMessagesDir:string = "";
var deletedMessagesDir:string = "";
var fileExt:string = ".json";

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

var deletedMessageDetails:DeletedMessageDetails = 
{
    "version": 1,
    "author": "author name",
    "authorID": "author id",
    "deletedContent": "deleted message",
    "guild": "guild",
    "channelID": "channel id"
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

            setupVars(msg);

            if(configHelper.getValue("save message logs"))
            {
                setupFolder(Folders.messages);

                var stringified = JSON.stringify(messageDetails, null, 4); 
                var fixedDir = path.join(messagesDir, configHelper.getValue("saveFileName"));
    
                if(configHelper.getValue("messages dir done"))
                {
                    writeFile(fixedDir, stringified);
                }
            }

            rl.prompt();
        });

        //this one might need a little bit of tweaking tbh
        client.on('messageUpdate', (oldMsg, newMsg) => 
        {
            if(newMsg.author?.bot) return;

            //the message is edited by the same person sooo it doesnt matter if oldMsg or newMsg is used
            editedMessageDetails.author = newMsg.author!.username;
            editedMessageDetails.authorID = newMsg.author!.id;
            editedMessageDetails.oldContent = oldMsg.content;
            editedMessageDetails.newContent = newMsg.content;
            editedMessageDetails.guild = newMsg.guild?.name;
            editedMessageDetails.channelID = newMsg.channelId;

            setupVars(newMsg);

            if(configHelper.getValue("save edited messages"))
            {
                setupFolder(Folders.edited_messages);

                var stringified = JSON.stringify(editedMessageDetails, null, 4);
                var fixedDir = path.join(editedMessagesDir, configHelper.getValue("saveFileName"));
                
                if(configHelper.getValue("edited messages dir done"))
                {
                    writeFile(fixedDir, stringified);
                }
            }

            rl.prompt();
        });

        client.on('messageDelete', (msg) => 
        {
            if(msg.author?.bot) return;

            deletedMessageDetails.author = msg.author!.username;
            deletedMessageDetails.authorID = msg.author!.id;
            deletedMessageDetails.deletedContent = msg.content;
            deletedMessageDetails.guild = msg.guild?.name;
            deletedMessageDetails.channelID = msg.channelId;

            setupVars(msg);

            if(configHelper.getValue("save deleted messages"))
            {
                setupFolder(Folders.deleted_messages);

                var stringified = JSON.stringify(deletedMessageDetails, null, 4);
                var fixedDir = path.join(deletedMessagesDir, configHelper.getValue("saveFileName"));

                if(configHelper.getValue("deleted messages dir done"))
                {
                    writeFile(fixedDir, stringified);
                }
            }
        });
    }
}

//we use the id to create the folder to avoid emojis or any special characters
function setupFolder(type:Folders)
{
    switch(type)
    {
        case Folders.messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, messageDetails.authorID));
            messagesDir = path.join(configHelper.getValue("authorDir"), "messages");
            if(!fs.existsSync(configHelper.getValue("authorDir"))){ fs.mkdirSync(configHelper.getValue("authorDir")); }
            if(!fs.existsSync(messagesDir)) { fs.mkdirSync(messagesDir); }
            configHelper.setNewValue("messages dir done", true);
            break;
        case Folders.edited_messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, editedMessageDetails.authorID));
            editedMessagesDir = path.join(configHelper.getValue("authorDir"), "edited_messages");
            if(!fs.existsSync(configHelper.getValue("authorDir"))){ fs.mkdirSync(configHelper.getValue("authorDir")); }
            if(!fs.existsSync(editedMessagesDir)){ fs.mkdirSync(editedMessagesDir); }
            configHelper.setNewValue("edited messages dir done", true);
            break;
        case Folders.deleted_messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, deletedMessageDetails.authorID));
            deletedMessagesDir = path.join(configHelper.getValue("authorDir"), "deleted_messages");
            if(!fs.existsSync(configHelper.getValue("authorDir"))){ fs.mkdirSync(configHelper.getValue("authorDir")); }
            if(!fs.existsSync(deletedMessagesDir)){ fs.mkdirSync(deletedMessagesDir); }
            configHelper.setNewValue("deleted messages dir done", true);
            break;
    }
}

function setupVars(msg:any)
{
    configHelper.setNewValue("saveDateVar", msg.createdAt.getDate() + "-" + msg.createdAt.getMonth() + "-" + msg.createdAt.getFullYear());
    configHelper.setNewValue("saveTimeVar", msg.createdAt.getHours() + ":" + msg.createdAt.getMinutes() + ":" + msg.createdAt.getSeconds() + "." + msg.createdAt.getMilliseconds());
    configHelper.setNewValue("saveFileName", configHelper.getValue("saveDateVar") + "_" + configHelper.getValue("saveTimeVar") + fileExt);
}

type MessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    content: string | never,
    guild: string | undefined,
    channelID: string
}

type EditedMessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    oldContent: string | null,
    newContent: string | null,
    guild: string | undefined,
    channelID: string
}

type DeletedMessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    deletedContent: string | null,
    guild: string | undefined,
    channelID: string
}

enum Folders
{
    messages,
    edited_messages,
    deleted_messages
}