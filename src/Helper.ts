import fs from 'fs';
import path from 'path';
import { Logger } from './NewLogger';

//highly inspired in fnf coolutil.hx method
export async function coolTextFile(path:string):Promise<string[]>
{
    var daList = fs.readFileSync(path, 'utf-8').trim().split('\n');
    return daList;
}

//will scan the given dir and return the folders in the order as it is in the filesystem
export async function scanDir(dir:string):Promise<string[]> 
{
    var returner:Array<string> = [];
    var scan = path.join(dir);
    var jaja = fs.readdirSync(scan);
    for(var i in jaja)
    {
        returner.push(jaja[i]);
    }
    return returner;
}

//just scan dir with some filter, pretty basic, just to search files with an extension
/**
 * 
 * @param dir Directory to scan
 * @param filt File extension to search
 * @returns Array with the files scanned
 */
export async function scanDirWFilt(dir:string, filt:string):Promise<string[]>
{
    var returner:Array<string> = [];
    var scan = path.join(dir);
    var jaja = fs.readdirSync(scan).filter(filtro => filtro.endsWith(`.${filt}`));
    for(var i in jaja)
    {
        returner.push(jaja[i]);
    }
    return returner;
}

//WHY WHY WHY WHY WHY
export async function createDirectory(newDirectory:string) {
    if(!fs.existsSync(newDirectory)){
        fs.mkdir(newDirectory, () => {});
    }
}

export async function scanDirTWOT(dir:string)
{
    var returner:Array<string> = [];
    var scan = path.join(dir);
    var first = await scanDir(scan);
    var second:Array<string> = [];
    for(var i in first)
    {
        var help = path.join(scan, first[i]);
        if(fs.existsSync(help))
        {
            second = await scanDir(help);
            for(var i in second)
            {
                var the = path.join(help, second[i]);
                returner.push(the);
            }
        }
        //returner.push(jaja[i]);
    }
    return returner;
}