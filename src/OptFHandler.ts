//for the .optf (option file) file extension
//todo, if trying to read a new option file, add it instead of re doing the whole setup
import fs from 'fs';
import { Logger } from './NewLogger';

var configVals:Array<string> = [];
var configNames:Array<string> = [];

var finishedSettingUp:boolean = false;

export async function setupOptionFile(path:string)
{
    var daList:Array<string> = [];
    if(path.endsWith(".optf"))
    {
        daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
        for(var i in daList)
        {
            var options = daList[i].split(":");
            configNames.push(options[0]);
            configVals.push(options[1]);

            finishedSettingUp = true;
        }
    }
    else
    {
        path += ".optf";
        await setupOptionFile(path);
    }
}

export function getOptionField(index:number):string
{
    var daValue:string = "";
    if(finishedSettingUp == true)
    {
        daValue = configVals[index];
    }
    else
    {
        Logger("didnt finish", "DEBUG")
        daValue = "null";
    }
    return daValue;
}