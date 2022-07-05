//config handler
import path from 'path';
import { scanDirWFilt } from '../Helper';

export var availableFunc:Array<string> = [];
export var pathToFunc:Array<string> = [];

export async function InitFunctions() 
{
    var the = path.join(__dirname, 'functions');
    var functionFiles = await scanDirWFilt(the, "ts");
    for(var i in functionFiles)
    {
        var file = path.join(the, functionFiles[i]);
        pathToFunc.push(file);
        const optFunc:FuncFileStruct = require(file);
        availableFunc.push(optFunc.alias);
        optFunc.exec();
    }
}

type FuncFileStruct =
{
    alias:string,
    exec:() => any
}