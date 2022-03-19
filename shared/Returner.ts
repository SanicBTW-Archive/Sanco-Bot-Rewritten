//the returner is a little bit stupid but somehow works
//comments will be moved to somewhere else or something
import LoggerConfig from './LoggerConfig.json';
import { Logger } from './NewLogger';

enum FieldTypes //lol field types m
{
    "LoggerConfig",
    "TerminalConfig",
}

type FieldType = keyof typeof FieldTypes;

//essential for everything, call this method when making a variable
export function ReturnFields(type:FieldType,index:number):any
{
    switch(type)
    {
        case "LoggerConfig":
            let imgLoggerConfig:any = LoggerConfig.options;
            return imgLoggerConfig[index];
        case "TerminalConfig":
            Logger("wip", "INFO");        
    }
}

//use if you want to get access to the option name, it cant be null fr
export function ReturnOptionName(Fields:any):string
{
    //failsafe
    if(Fields.optionName != null) return Fields.optionName;
    else throw new Error("Couldn't find the option name");
}

//use if you want to get access to the option state and if the state isnt null
export function ReturnOptionState(Fields:any):boolean
{
    //maybe another failsafe??
    if(Fields.optionState != null) return Fields.optionState;
    else throw new Error("Couldn't find the option state");
}

//use if you want to get access to the option value and if the value isnt null
export function ReturnOptionValue(Fields:any):string
{
    //failsafe seems to work
    if(Fields.optionValue != null) return Fields.optionValue;
    else throw new Error("Couldn't find the option value or its null");
}