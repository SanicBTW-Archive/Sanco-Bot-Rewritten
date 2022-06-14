//for the .optf (option file) file extension
import fs from 'fs';
import { coolTextFile } from '../Helper';
import { Logger } from '../NewLogger';

export var configuration:[{
    optName: string | null, 
    optState: string | null
}];

export async function setupOptionFile(path:string)
{
    configuration = [{optName: null, optState: null}]
    var daList:Array<string> = [];
    if(path.endsWith(".optf"))
    {
        daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
        for(var i in daList)
        {
            var options = daList[i].split(":");
            configuration.push({optName: options[0], optState: options[1]})
            configuration[i].optName = options[0];
            configuration[i].optState = options[1];
            //the last item is repeated for some reason
            configuration.at(-1)!.optName = null;
            configuration.at(-1)!.optState = null;
        }
    }
    else
    {
        Logger("not an option file", "INFO");
    }
}