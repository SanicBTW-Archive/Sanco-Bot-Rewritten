//used to handle the upload command in index.js
import path from 'path';
import fs from 'fs';
import { coolTextFile, createDirectory, scanDir } from '../Helper';
import config from '../data/config/DConf.json';
import { Logger } from '../NewLogger';

//helps the save functions and stuff
var helpArray:BackupStruct = 
{
    "backupFileDir": "",
    "backupParentDir": "",
    "backupFilePath": ""
}

export function startUpload(details:DetailsArrStruct)
{
    var parentAuthorDir = path.join(__dirname, "user_uploaded", details.author);
    var fileDir = path.join(parentAuthorDir, details.filename!);

    var easier:string = `${details.author}-${details.filename}`
    details['filename-alias'] = easier;
    details['request-url'] = easier;

    createDirectory(parentAuthorDir);

    createDirectory(fileDir);

    helpArray.backupParentDir = parentAuthorDir;
    helpArray.backupFileDir = fileDir;
    helpArray.backupFilePath = fileDir + "/data.json";
    saveJSON(details);
}

function saveJSON(arrayToJSON:DetailsArrStruct) {
    var theJSON = JSON.stringify(arrayToJSON, null, 4);
    if(!fs.existsSync(helpArray.backupFileDir)){
        createDirectory(helpArray.backupParentDir);
        createDirectory(helpArray.backupFileDir);
    }
    fs.writeFileSync(helpArray.backupFilePath, theJSON);
    Logger("Data JSON saved", "SUCCESS");
}

//will save the file in the preset folder which is in "user_uploaded" and the user folder which sent the note
function saveFile(file:String)
{
    
}

type DetailsArrStruct = 
{
    "author": string,
    "filename": string | null | undefined,
    "filename-alias": string,
    "creation-date": string,
    "request-url": string,
    "file": string | undefined,
}

type BackupStruct = 
{
    "backupFileDir": string,
    "backupParentDir": string,
    "backupFilePath": string
}