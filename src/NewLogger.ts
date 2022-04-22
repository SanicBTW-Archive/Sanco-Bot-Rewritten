//todo: improve spaghetti aka the switch case lol
import color from 'colorts';
import config from './data/config/LoggerConfig.json';

enum LogLevels 
{
    "INFO",
    "WARNING",
    "ERROR",
    "DEBUG",
    "SUCCESS"
}

type LogLevelsStrings = keyof typeof LogLevels;

let showDebugLogsState = config.options[1].optionState;
let ignoreLogErrorsState = config.options[2].optionState;

export function Logger(message:any, key?:LogLevelsStrings)
{
    const jaja = `[ ${key} ]`;

    var styleTable = 
    {
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
    }
}