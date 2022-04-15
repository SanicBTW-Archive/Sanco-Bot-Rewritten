//uses the same concept as the dynamic terminal settings
import path from 'path';
import fs from 'fs';
import { coolTextFile } from '../Helper';

export var noteName:Array<string> = [];
export var noteAlias:Array<string> = [];
export var noteCreationDate:Array<string> = [];
export var noteLastUpdate:Array<string> = [];
export var noteRequest:Array<string> = [];
export var noteLocked:Array<boolean> = [];
export var notePasswd:Array<String> = [];

export var noteList = path.join(__dirname, "noteList.txt");
export async function StartHandler()
{
    var data = await coolTextFile(noteList);
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
    noteName.push(handler.dataName);
    noteAlias.push(handler.noteAlias);
    noteCreationDate.push(handler.creationDate);
    noteLastUpdate.push(handler.lastUpdate);
    noteRequest.push(handler.reqUrl);
    noteLocked.push(handler.locked);
    notePasswd.push(handler.passwdToUnlock);
}

type HandlerStruct = 
{
    execute: () => any,
    dataName: string,
    noteAlias: string,
    creationDate: string,
    lastUpdate: string,
    reqUrl: string,
    locked: boolean,
    passwdToUnlock: string;
}