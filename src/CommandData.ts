//highly inspired from the configuration code
import fs from 'fs';
import { type } from 'os';
import path from 'path';
import { client } from '..';
import { scanDir } from './Helper';

export var commandNames:string[] = [];
var commandsStuff:any = new Object();

//lol i kinda fucked up on this one
export class CommandHelper
{
    addCommand(commandName:string, commandDetails:any = null)
    {
        commandsStuff[commandName] = commandDetails;
    }

    getCommandDetail(commandName:string, commandDetailIdx:number)
    {
        return commandsStuff[commandName][commandDetailIdx];
    }
}

//reads given directory
export class CommandData extends CommandHelper
{
    constructor(dirToRead:string)
    {
        super();
        var commandFolders = scanDir(dirToRead);
        for(var i in commandFolders)
        {
            var folderName = commandFolders[i];
            commandNames.push(folderName);

            var detailsFilePath = path.join(dirToRead, folderName, "details.txt"); //THIS ONE ISNT WORKING WITH .. AT THE BEGGINING HELLO???
            
            var handlerFilePath = path.join("..", dirToRead, folderName, `script.js`);
            
            if(fs.existsSync(handlerFilePath))
            {
                const handler = require(`${handlerFilePath}`);
                handler.init(client);
            }
            this.addCommand(folderName, fs.readFileSync(detailsFilePath, 'utf-8').trim().split('\n'));
        }
    }
}