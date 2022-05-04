//used to handle the upload command in index.js
import path from 'path';
import fs from 'fs';
import { coolTextFile, scanDir } from '../Helper';
import config from '../data/config/DConf.json';
import { Logger } from '../NewLogger';

Logger("Upload Handler Called!", "DEBUG");

//maybe get a given array with the details??
//the filename alias should be replace with the following format: "*author*-*filename*" WITHOUT THE FILE EXTENSION
export function startUpload(details:DetailsArrStruct)
{
    Logger("Start Upload Function Called!", "DEBUG");
    console.table(details);
    Logger("Reformatting the given array", "DEBUG");
    var easier:string = `${details.author}-${details.filename}`
    Logger("Changing the file name alias", "DEBUG");
    details['filename-alias'] = easier;
    Logger("Changing the request url", "DEBUG");
    details['request-url'] = easier;
    Logger("Done reformatting, I guess", "DEBUG");
    Logger("Given Array", "DEBUG");
    console.table(details);
    Logger("Done", "SUCCESS");
}

//will save the file in the preset folder which is in "user_uploaded" and the user folder which sent the note
export function saveFile(file:String)
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