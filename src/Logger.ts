import Discord from 'discord.js';
import path from 'path';
import fs from 'fs';
import { writeFile } from './Helper';
import { ConfigHelper, Ignore } from './Configuration';

var configHelper = new ConfigHelper();

//migrate to configHelper next commit
var messagesDir:string = "";
var editedMessagesDir:string = "";
var deletedMessagesDir:string = "";
var fileExt:string = ".json";

export class LoggingHandler
{
    constructor(client:Discord.Client)
    {
        client.on('messageCreate', (msg) =>
        {
            configHelper.setNewValue("logsDir", path.join('.', "users", msg.author!.id, "logs"));
            if(!fs.existsSync(configHelper.getValue("logsDir"))){ fs.mkdirSync(configHelper.getValue("logsDir")); }

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
                setupFolder(Folders.messages);

                var stringified = JSON.stringify(details, null, 4); 
                var fixedDir = path.join(messagesDir, configHelper.getValue("saveFileName"));
    
                if(configHelper.getValue("messages dir done"))
                {
                    writeFile(fixedDir, stringified);
                }
            }
        });

        //this one might need a little bit of tweaking tbh
        client.on('messageUpdate', (oldMsg, newMsg) => 
        {
            configHelper.setNewValue("logsDir", path.join('.', "users", newMsg.author!.id, "logs"));
            if(!fs.existsSync(configHelper.getValue("logsDir"))){ fs.mkdirSync(configHelper.getValue("logsDir")); }

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
                setupFolder(Folders.edited_messages);

                var stringified = JSON.stringify(details, null, 4);
                var fixedDir = path.join(editedMessagesDir, configHelper.getValue("saveFileName"));
                
                if(configHelper.getValue("edited messages dir done"))
                {
                    writeFile(fixedDir, stringified);
                }
            }
        });

        client.on('messageDelete', (msg) => 
        {
            configHelper.setNewValue("logsDir", path.join('.', "users", msg.author!.id, "logs"));
            if(!fs.existsSync(configHelper.getValue("logsDir"))){ fs.mkdirSync(configHelper.getValue("logsDir")); }

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
                setupFolder(Folders.deleted_messages);

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
function setupFolder(type:Folders)
{
    switch(type)
    {
        case Folders.messages:
            messagesDir = path.join(configHelper.getValue("logsDir"), "messages");
            if(!fs.existsSync(messagesDir)) { fs.mkdirSync(messagesDir); }
            configHelper.setNewValue("messages dir done", true);
            break;
        case Folders.edited_messages:
            editedMessagesDir = path.join(configHelper.getValue("logsDir"), "edited_messages");
            if(!fs.existsSync(editedMessagesDir)){ fs.mkdirSync(editedMessagesDir); }
            configHelper.setNewValue("edited messages dir done", true);
            break;
        case Folders.deleted_messages:
            deletedMessagesDir = path.join(configHelper.getValue("logsDir"), "deleted_messages");
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