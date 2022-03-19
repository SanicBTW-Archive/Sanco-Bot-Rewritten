//todo: improve spaghetti aka the switch case lol
import color from 'colorts';
import { ReturnFields, ReturnOptionState} from './Returner';
import fs from 'fs';
import path from 'path';

enum LogLevels 
{
    "INFO",
    "WARNING",
    "ERROR",
    "DEBUG",
    "SUCCESS"
}

type LogLevelsStrings = keyof typeof LogLevels;

var ToSave:Array<string> = []; //Used to save the logs in a file when the bot is closed

let showDebugLogs = ReturnFields("LoggerConfig", 1);
let showDebugLogsState = ReturnOptionState(showDebugLogs);

let ignoreLogErrors = ReturnFields("LoggerConfig", 2);
let ignoreLogErrorsState = ReturnOptionState(ignoreLogErrors);

export function Logger(message:any, key?:LogLevelsStrings)
{
    const jaja = `[ ${key} ]`;

    var styleTable = 
    {
        "oops": color("Log Level not set, check your code ").bgRed.black.underline + ` ${message}`,
        "INFO" : color(jaja).bgBlue.black + ` ${message}`,
        "WARNING": color(jaja).bgYellow.black + ` ${message}`,
        "ERROR": color(jaja).bgRed.black + ` ${message}`,
        "DEBUG": color(jaja).bgWhite.black + ` ${message}`,
        "SUCCESS": color(jaja).bgCyan.black + ` ${message}`
    };

    switch(key)
    {
        case "INFO":
            return console.log(styleTable[key]); 
        case "WARNING":
            return console.log(styleTable[key]);
        case "ERROR":
            if(ignoreLogErrorsState) return console.log(styleTable[key] + " - Ignoring error!");
            else throw console.log(styleTable[key]);
        case "DEBUG":
            //fail safe kind of works
            if(showDebugLogsState == true) return console.log(styleTable[key]);
            else if (showDebugLogsState == false && ignoreLogErrorsState) Logger("Can't show debug logs if the option is disabled", "ERROR");
            else throw Logger("Can't show debug logs if the option is disabled", "ERROR");
        case "SUCCESS":
            return console.log(styleTable[key]);
        default:
            return console.log(styleTable["oops"]);
    }
}