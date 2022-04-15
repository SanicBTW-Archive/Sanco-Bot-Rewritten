//uses the same concept as the dynamic terminal settings
import path from 'path';
import fs from 'fs';
import { Logger } from '../src/NewLogger';
export var notesName:Array<string> = [];
export var notesAlias:Array<string> = [];
export var notesCreationDate:Array<string> = [];
export var notesLastUpdate:Array<string> = [];
export var notesRequest:Array<string> = [];

var dataList = path.join(__dirname, "dataList.txt");
export async function StartHandler()
{
    fs.readFile(dataList, 'utf-8', (err, data) => {
        if(err)
        {
            return Logger(err, "ERROR");
        }

        var jaja = data.trim().split('\n');

        for(var i in jaja)
        {
            Logger(`${i} | ${jaja[i]}`, "DEBUG");
        }
    })
}

var scanfolder = path.join(__dirname, "contents");
export async function OldHandler()
{
    const folders = fs.readdirSync(scanfolder).filter(folder => folder.endsWith("_data"));
    for(const folder of folders)
    {
        //searches the handler
        var newP = path.join(scanfolder, folder, "handler.ts");
        if(fs.existsSync(newP)){
            const fileToExec = require(newP);
            fileToExec.execute();
            notesName.push(fileToExec.dataName);
            notesAlias.push(fileToExec.noteAlias);
            notesCreationDate.push(fileToExec.creationDate);
            notesLastUpdate.push(fileToExec.lastUpdate);
            notesRequest.push(fileToExec.reqUrl);
        }
    }
}