//used to handle the upload command in index.js
import path from 'path';
import fs from 'fs';
import { coolTextFile, createDirectory, scanDir } from '../Helper';
import config from '../data/config/DConf.json';
import { Logger } from '../NewLogger';
import fetch, {Response} from 'node-fetch';

//helps the save functions and stuff
var helpArray:BackupStruct = 
{
    "fileDir": "",
    "parentDir": "",
    "dataPath": "",
    "filePath": ""
}

export async function startUpload(details:DetailsArrStruct, fileURL:string)
{
    var parentAuthorDir = path.join(__dirname, "user_uploaded", details.author);
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
    "filePath": string;
}