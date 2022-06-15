import Discord, { DMChannel, Guild, NewsChannel, PartialDMChannel, TextChannel, ThreadChannel } from 'discord.js';
import { Logger } from './NewLogger';
import { rl } from '..';

export var pushedMessages:any = [];

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
        Logger("received client and setting events!", "DEBUG");

        client.on('messageCreate', (msg) => {
            if(msg.author.bot) return;

            Logger("Setting up message details table", "DEBUG");
            details.author = msg.author.username;
            details.authorID = msg.author.id;
            details.content = msg.content;
            details.creationDate = msg.createdAt.toUTCString();
            details.guild = msg.guild?.name;
            details.channelID = msg.channelId;
            console.table(details);
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