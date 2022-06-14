//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import {rl, client} from '../../index';
import { availableFunc, pathToFunc } from './ConfHandler';

export async function InitConsoleCommands(){
    rl.prompt();
    
    rl.on('line', async (line) => {
        let args = line.split(" ");

        if(args[0] == "exit") 
            rl.close();

        rl.prompt();
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Terminating process", 'WARNING');
        process.exit();
    })
}