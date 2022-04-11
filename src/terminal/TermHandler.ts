//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import axios from 'axios';
import { urlReq } from '../../server/server';
import { StartHandler } from '../../server/MainHandler';

export async function InitConsoleCommands(client:Discord.Client, rl:readline.Interface){
    rl.prompt();
    
    rl.on('line', async (line) => {
        let args = line.split(" ");

        switch(args[0])
        {
            case "exit":
                rl.close();
                break;
        }
        rl.prompt();
    }).on('close', () => {
        client.destroy();
        Logger("Client destroyed", 'WARNING');
        Logger("Terminating process", 'WARNING');
        process.exit();
    })
}