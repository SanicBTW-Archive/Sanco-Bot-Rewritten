//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import {rl, client} from '../../index';

export async function InitConsoleCommands(){
    rl.prompt();
    
    rl.on('line', async (line) => {
        let args = line.split(" ");

        if(args[0] == "exit") 
            rl.close();

        rl.prompt();
    }).on('close', () => {
        client.destroy();
        console.log("Client destroyed");
        console.log("Terminating process");
        process.exit();
    })
}