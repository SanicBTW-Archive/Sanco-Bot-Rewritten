//uses the same concept as the dynamic terminal settings
import path from 'path';
import fs from 'fs';
import { Logger } from '../NewLogger';
import { coolTextFile } from '../Helper';
export var dataName:Array<string> = [];
export var dataAlias:Array<string> = [];
export var dataCreationDate:Array<string> = [];
export var dataLastUpdate:Array<string> = [];
export var dataRequest:Array<string> = [];

export var dataList = path.join(__dirname, "dataList.txt");
export async function StartHandler()
{
    var data = await coolTextFile(dataList);
    for(var i in data)
    {
        var handler = path.join(__dirname, "data", data[i], "handler.ts");
        if(fs.existsSync(handler)){
            const thefunny:HandlerStruct = require(handler);
            executeAndPush(thefunny);
        }
    }
}

function executeAndPush(handler:HandlerStruct)
{
    handler.execute();
    dataName.push(handler.dataName);
    dataAlias.push(handler.noteAlias);
    dataCreationDate.push(handler.creationDate);
    dataLastUpdate.push(handler.lastUpdate);
    dataRequest.push(handler.reqUrl);
}

/* Old handler
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
}*/

type HandlerStruct = 
{
    execute: () => any,
    dataName: string,
    noteAlias: string,
    creationDate: string,
    lastUpdate: string,
    reqUrl: string;
}