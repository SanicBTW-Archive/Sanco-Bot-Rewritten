//config handler
import { Logger } from '../NewLogger';
import path from 'path';
import fs from 'fs';

export async function InitFunctions() 
{
    var the = path.join(__dirname, 'functions');
    const functionFiles = fs.readdirSync(the).filter(file => file.endsWith(".ts"));
    for(const file of functionFiles)
    {
        var the2 = path.join(the, file);
        const optFunc = require(the2);
        optFunc.exec();
    }
}