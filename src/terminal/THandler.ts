//terminal handler aka commands and shit
//literally stolen from the original sanic bot typescript branch
import * as readline from 'readline';
import Discord from 'discord.js';
import { Logger } from '../NewLogger';
import path from 'path';

export function InitConsoleCommands(client:Discord.Client, rl:readline.Interface){
    rl.prompt();
    
    rl.on('line', (line) => {
        Logger(`Executed command: ${line}`, "DEBUG");
        let args = line.split(" ");

        var jaja = path.join('commads', line);

        //const file = require(`./commands/${line}`);
        //file.exec();
        Logger(jaja, "DEBUG");
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