//for the .optf (option file) file extension
//todo, if trying to read a new option file, add it instead of re doing the whole setup
import fs from 'fs';

export var configuration:[{
    optType: string,
    optName: string, 
    optState: string
}];

export var availableIndexes:Array<number> = [0];

export async function setupOptionFile(path:string,)
{
    configuration = [{optType: "null", optName: "null", optState: "null"}]
    var daList:Array<string> = [];
    var index = 0;
    if(path.endsWith(".optf"))
    {
        daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
        for(var i in daList)
        {
            index ++;
            var options = daList[i].split(":");
            var type = daList[i].split("|");
            configuration.push({optType: type[0], optName: options[0].replace(type[0] + "|", ""), optState: options[1]});
            configuration[i].optType = type[0];
            configuration[i].optName = options[0].replace(type[0] + "|", "");
            configuration[i].optState = options[1];
            //the last item is repeated for some reason
            configuration.at(-1)!.optType = "null";
            configuration.at(-1)!.optName = "null";
            configuration.at(-1)!.optState = "null";
            availableIndexes.push(index)
        }
    }
    else
    {
        path += ".optf";
        await setupOptionFile(path);
    }
}