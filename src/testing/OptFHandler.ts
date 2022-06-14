//for the .optf (option file) file extension
import fs from 'fs';
import { Logger } from '../NewLogger';

export var configuration:[{
    optType: string | null,
    optName: string | null, 
    optState: string | number | boolean | null //these are quite useless, as we are reading a file but we dont know what type this thing is
}];

export async function setupOptionFile(path:string,)
{
    configuration = [{optType: null, optName: null, optState: null}]
    var daList:Array<string> = [];
    if(path.endsWith(".optf"))
    {
        daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
        for(var i in daList)
        {
            var options = daList[i].split(":");
            var type = daList[i].split("|");
            configuration.push({optType: type[0], optName: options[0].replace(type[0] + "|", ""), optState: options[1]});
            configuration[i].optType = type[0];
            configuration[i].optName = options[0].replace(type[0] + "|", "");
            configuration[i].optState = options[1];
            //the last item is repeated for some reason
            configuration.at(-1)!.optType = null;
            configuration.at(-1)!.optName = null;
            configuration.at(-1)!.optState = null;
        }
    }
    else
    {
        Logger("not an option file", "ERROR");
    }
}