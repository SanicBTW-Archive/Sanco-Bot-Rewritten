//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import { started, startServer } from '../server/server';
import {rl, client} from '../../index';

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
        rl.prompt();
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Terminating process", 'WARNING');
        process.exit();
    })
}