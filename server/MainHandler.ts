//uses the same concept as the dynamic terminal settings
import path from 'path';
import fs from 'fs';

var scanfolder = path.join(__dirname, "contents");
export async function StartHandler()
{
    const folders = fs.readdirSync(scanfolder).filter(folder => folder.endsWith("_data"));
    for(const folder of folders)
    {
        //searches the handler
        var newP = path.join(scanfolder, folder, "handler.ts");
        if(fs.existsSync(newP)){
            const fileToExec = require(newP);
            fileToExec.execute();
        }
    }
}