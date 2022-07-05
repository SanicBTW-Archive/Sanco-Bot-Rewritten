import Discord from 'discord.js';
import { rl } from '..';
import path from 'path';
import fs from 'fs';
import { writeFile } from './Helper';
import { ConfigHelper, Ignore } from './ConfigHandler';

var configHelper = new ConfigHelper();

var logsDir:string = path.join('.', 'logs');
//migrate to configHelper next commit
var messagesDir:string = "";
var editedMessagesDir:string = "";
var deletedMessagesDir:string = "";
var fileExt:string = ".json";

export class EventHandler
{
    constructor(client:Discord.Client)
    {
        client.on('messageCreate', (msg) =>
        {
            if(msg.author?.bot) return;

            var details:MessageDetails = 
            {
                "version": 1.3,
                "author": "author name",
                "authorID": "author id",
                "content": "message content",
                "guild": "guild",
                "channelName": "channel name",
                "channelID": "channel id"
            }

            details.author = msg.author.username;
            details.authorID = msg.author.id;
            details.content = msg.content;
            details.guild = msg.guild?.name;
            details.channelName = msg.guild!.channels.cache.get(msg.channelId)!.name;
            details.channelID = msg.channelId;

            setupVars(msg);

            if(configHelper.getValue("save message logs") && checkUserID(msg.author.id))
            {
                setupFolder(Folders.messages, details.authorID);

                var stringified = JSON.stringify(details, null, 4); 
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

            var details:EditedMessageDetails = 
            {
                "version": 1.1,
                "author": "author name",
                "authorID": "author id",
                "oldContent": "old message content",
                "newContent": "new message content",
                "guild": "guild",
                "channelName": "channel name",
                "channelID": "channel id",
            }

            //the message is edited by the same person sooo it doesnt matter if oldMsg or newMsg is used
            details.author = newMsg.author!.username;
            details.authorID = newMsg.author!.id;
            details.oldContent = oldMsg.content;
            details.newContent = newMsg.content;
            details.guild = newMsg.guild?.name;
            details.channelName = newMsg.guild!.channels.cache.get(newMsg.channelId)!.name;
            details.channelID = newMsg.channelId;

            setupVars(newMsg);

            if(configHelper.getValue("save edited messages") && checkUserID(newMsg.author!.id))
            {
                setupFolder(Folders.edited_messages, details.authorID);

                var stringified = JSON.stringify(details, null, 4);
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

            var details:DeletedMessageDetails = 
            {
                "version": 1.1,
                "author": "author name",
                "authorID": "author id",
                "deletedContent": "deleted message",
                "guild": "guild",
                "channelName": "channel name",
                "channelID": "channel id"
            }

            details.author = msg.author!.username;
            details.authorID = msg.author!.id;
            details.deletedContent = msg.content;
            details.guild = msg.guild?.name;
            details.channelName = msg.guild!.channels.cache.get(msg.channelId)!.name;
            details.channelID = msg.channelId;

            setupVars(msg);

            if(configHelper.getValue("save deleted messages") && checkUserID(msg.author!.id))
            {
                setupFolder(Folders.deleted_messages, details.authorID);

                var stringified = JSON.stringify(details, null, 4);
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
function setupFolder(type:Folders, authorID:string)
{
    switch(type)
    {
        case Folders.messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, authorID));
            messagesDir = path.join(configHelper.getValue("authorDir"), "messages");
            if(!fs.existsSync(configHelper.getValue("authorDir"))){ fs.mkdirSync(configHelper.getValue("authorDir")); }
            if(!fs.existsSync(messagesDir)) { fs.mkdirSync(messagesDir); }
            configHelper.setNewValue("messages dir done", true);
            break;
        case Folders.edited_messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, authorID));
            editedMessagesDir = path.join(configHelper.getValue("authorDir"), "edited_messages");
            if(!fs.existsSync(configHelper.getValue("authorDir"))){ fs.mkdirSync(configHelper.getValue("authorDir")); }
            if(!fs.existsSync(editedMessagesDir)){ fs.mkdirSync(editedMessagesDir); }
            configHelper.setNewValue("edited messages dir done", true);
            break;
        case Folders.deleted_messages:
            configHelper.setNewValue("authorDir", path.join(logsDir, authorID));
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

//checks if the user id given should be ignored
function checkUserID(userIDtoCheck:string):boolean
{
    for(var i in Ignore)
    {
        var userIDToIgnore = Ignore[i];
        if(userIDtoCheck == userIDToIgnore)
        {
            return false; //the id given has to be ignored
        }
    }
    return true; //all good, the id given doesnt have to be ignored
}

type MessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    content: string | never,
    guild: string | undefined,
    channelName: string,
    channelID: string,
}

type EditedMessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    oldContent: string | null,
    newContent: string | null,
    guild: string | undefined,
    channelName: string,
    channelID: string
}

type DeletedMessageDetails = 
{
    version: number,
    author: string,
    authorID: string,
    deletedContent: string | null,
    guild: string | undefined,
    channelName: string,
    channelID: string
}

enum Folders
{
    messages,
    edited_messages,
    deleted_messages
}