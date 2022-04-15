import fs from 'fs';
import { Logger } from './NewLogger';

//highly inspired in fnf coolutil.hx method
export async function coolTextFile(path:string):Promise<string[]>
{
    var daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
    return daList;
    /* old
    var daList:Array<string> = [];
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) return Logger(err, "ERROR");
        var thingy = data.trim().split('\n');
        for(var i in thingy)
        {
            var index = i;
            var entryIndex = thingy[i]; 
            Logger("Being called from helper | " + `${index} | ${entryIndex}`, "DEBUG");
            daList.push(entryIndex);
        }
    });
    return daList;*/
}