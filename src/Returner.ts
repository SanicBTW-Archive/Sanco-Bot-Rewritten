//the returner is a little bit stupid but somehow works
import LoggerConfig from './data/settings/LoggerConfig.json';
import TConf from './data/settings/TConf.json'

enum FieldTypes //lol field types m
{
    "LoggerConfig",
    "TerminalConfig",
}

type FieldType = keyof typeof FieldTypes;

export function ReturnFields(type:FieldType,index:number):any
{
    switch(type)
    {
        case "LoggerConfig":
            let imgLoggerConfig:any = LoggerConfig.options;
            return imgLoggerConfig[index];
        case "TerminalConfig":
            let TermConf:any = TConf.options;
            return TermConf[index];
    }
}

export function ReturnOptionName(Fields:any):string
{
    //failsafe
    if(Fields.optionName != null) return Fields.optionName;
    else throw new Error("Couldn't find the option name");
}

export function ReturnOptionState(Fields:any):boolean
{
    //maybe another failsafe??
    if(Fields.optionState != null) return Fields.optionState;
    else throw new Error("Couldn't find the option state");
}

export function ReturnOptionValue(Fields:any):string
{
    //failsafe seems to work
    if(Fields.optionValue != null) return Fields.optionValue;
    else throw new Error("Couldn't find the option value or its null");
}

export function ReturnFuncPath(Fields:any):string
{
    if(Fields.functionFile != null) return Fields.functionFile;
    else throw new Error("Couldn't find the option function path");
}