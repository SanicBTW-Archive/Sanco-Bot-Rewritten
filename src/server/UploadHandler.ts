//used to handle the upload command in index.js
import path from 'path';
import fs from 'fs';
import { coolTextFile, createDirectory, scanDir } from '../Helper';
import config from '../data/config/DConf.json';
import { Logger } from '../NewLogger';
import fetch, {Response} from 'node-fetch';

export var mainFolder = path.join(__dirname, "user_uploaded");
var templateHandler = path.join(mainFolder, "template", "help", "handler.ts");

//helps the save functions and stuff
var helpArray:BackupStruct = 
{
    "fileDir": "",
    "parentDir": "",
    "dataPath": "",
    "filePath": "",
    "handlerPath": "",
}

export async function startUpload(details:DetailsArrStruct, fileURL:string)
{
    var parentAuthorDir = path.join(mainFolder, details.author);
    var fileDir = path.join(parentAuthorDir, details.filename!);

    var easier:string = `${details.author}-${details.filename}`
    details['filename-alias'] = easier;
    details['request-url'] = "/" + easier;

    createDirectory(parentAuthorDir);

    createDirectory(fileDir);

    helpArray.parentDir = parentAuthorDir;
    helpArray.fileDir = fileDir;
    helpArray.dataPath = fileDir + "/data.json";

    await saveJSON(details);

    helpArray.filePath = fileDir + "/" + details.filename + ".txt";

    await saveFile(fileURL);

    helpArray.handlerPath = fileDir + "/handler.ts";

    await saveHandler();
}

async function saveJSON(arrayToJSON:DetailsArrStruct) {
    var theJSON = JSON.stringify(arrayToJSON, null, 4);
    fs.writeFileSync(helpArray.dataPath, theJSON);
}

async function saveFile(file:string)
{
    try
    {
        const the:Response = await fetch(file);
        if(!the.ok) return Logger("Oops, file fetch messed up", "ERROR");
        const textFile = await the.text();
        if(textFile){
            fs.writeFileSync(helpArray.filePath, textFile);
        }
    }
    catch(excp)
    {
        Logger(excp, "ERROR");
    }
}

async function saveHandler()
{
    try
    {
        await fs.copyFileSync(templateHandler, helpArray.handlerPath);
    }
    catch(excp)
    {
        Logger(excp, "ERROR");
    }
}

//its like the main handler function
export var userNoteName:Array<string> = [];
export var userNoteAlias:Array<string> = [];
export var userNoteCreationDate:Array<string> = [];
export var userNoteRequest:Array<string> = [];

export async function StartUserHandler()
{
    //first
    var first:Array<string> = ["yo"];
    var second:Array<string> = ["wassup"];
    Logger("Scannin user uploaded directory for notes", "INFO");
    first = await scanDir(mainFolder);
    for(var i in first)
    {
        //second
        var help = path.join(mainFolder, first[i]);
        if(fs.existsSync(help)){
            second = await scanDir(help);
            for(var i in second)
            {
                //last
                var handler = path.join(help, second[i], "handler.ts");
                if(fs.existsSync(handler)){
                    const thefunny:HandlerStruct = require(handler);
                    executeAndPush(thefunny);
                }
            }
        }
    }
}

export async function scanthree()
{

}

function executeAndPush(file:HandlerStruct)
{
    file.execute();
    userNoteName.push(file.dataName);
    userNoteAlias.push(file.noteAlias);
    userNoteCreationDate.push(file.creationDate);
    userNoteRequest.push(file.reqUrl);
}

type DetailsArrStruct = 
{
    "author": string,
    "filename": string | null | undefined,
    "filename-alias": string,
    "creation-date": string,
    "request-url": string
}

type BackupStruct = 
{
    "fileDir": string,
    "parentDir": string,
    "dataPath": string,
    "filePath": string,
    "handlerPath": string
}

type HandlerStruct = 
{
    "dataName": string,
    "noteAlias": string,
    "creationDate": string,
    "reqUrl": string,
    execute: () => any
}