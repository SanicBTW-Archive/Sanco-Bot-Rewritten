//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import { started, startServer } from '../server/server';
import {rl, client} from '../../index';
import { availableFunc, pathToFunc } from './ConfHandler';

export async function InitConsoleCommands(){
    rl.prompt();
    
    rl.on('line', async (line) => {
        let args = line.split(" ");

        if(args[0] == "exit") 
            rl.close();
        if(args[0] === "start" && args[1] === "server")
        {
            if(started != true){
                await startServer().then(() => {
                    rl.prompt();
                })
            }
            else
            {
                Logger("Already started!", "WARNING");
            }
        }

        if(args[0] === "execute")
        {
            if(args[1] === "")
            {
                Logger("functions menu");
                for(var i in availableFunc)
                {
                    Logger(availableFunc[i]);
                }
            }
            else
            {
                var searchIndex = availableFunc.indexOf(args[1]);
                if(searchIndex == -1)
                {
                    Logger("error", "ERROR");
                }
                if(args[1] == availableFunc[searchIndex])
                {
                    var the = require(pathToFunc[searchIndex]);
                    the.exec();
                }
            }
        }

        rl.prompt();
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Terminating process", 'WARNING');
        process.exit();
    })
}