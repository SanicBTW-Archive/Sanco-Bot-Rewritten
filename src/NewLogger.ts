//todo: improve spaghetti aka the switch case lol
import color from 'colorts';

enum LogLevels 
{
    "INFO",
    "WARNING",
    "ERROR",
    "DEBUG",
    "SUCCESS"
}

type LogLevelsStrings = keyof typeof LogLevels;

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
            return console.log(styleTable[key]);
        case "DEBUG":
            return console.log(styleTable[key]);
        case "SUCCESS":
            return console.log(styleTable[key]);
    }
}