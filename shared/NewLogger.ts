//todo: improve spaghetti aka the switch case lol
import color from 'colorts';
import { ReturnFields, ReturnOptionName, ReturnOptionState, ReturnOptionValue} from './Returner';

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
console.table(showDebugLogs);



export function Logger(message:any, key?:LogLevelsStrings)
{
    const jaja = `[ ${key} ]`;
    const forLogs = jaja + ` ${message}`;

    var styleTable = 
    {
        "oops": color("Log Level not set, check your code ").bgRed.black.underline + ` ${message}`,
        "INFO" : color(jaja).bgBlue.black + ` ${message}`,
        "WARNING": color(jaja).bgYellow.black + ` ${message}`,
        "ERROR": color(jaja).bgRed.black + ` ${message}`,
        "DEBUG": color(jaja).bgWhite.black + ` ${message}`,
        "SUCCESS": color(jaja).bgCyan.black + ` ${message}`
    };

    ToSave.push(forLogs);
    switch(key)
    {
        case "INFO":
            return console.log(styleTable[key]); 
        case "WARNING":
            return console.log(styleTable[key]);
        case "ERROR":
            return console.log(styleTable[key]);
            //if the setting is enable ignore the throw and just throw a return
            //throw console.log(styleTable[key]);
        case "DEBUG":
            return console.log(styleTable[key]);
            //if(showDebugLogs) return console.log(styleTable[key]);
            //else throw Logger("Can't show debug logs if the option is disabled", "ERROR");
        case "SUCCESS":
            return console.log(styleTable[key]);
        default:
            return console.log(styleTable["oops"]);
    }
}

//not used for anything
export function SaveFile()
{

}