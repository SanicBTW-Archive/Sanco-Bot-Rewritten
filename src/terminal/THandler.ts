//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import axios from 'axios';
import { urlReq } from '../../server/server';

export async function InitConsoleCommands(client:Discord.Client, rl:readline.Interface){
    rl.prompt();
    
    rl.on('line', async (line) => {
        let args = line.split(" ");

        switch(args[0])
        {
            case "req":
                rl.question('what do you want to request ', async (requestjaja) => {
                    const resp = await axios.get(`${urlReq}${requestjaja}`);
                    Logger(resp.data, "DEBUG");
                    rl.prompt();
                })
                break;
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