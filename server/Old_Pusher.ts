//im gonna keep it because the way it works its really fucking cool, thanks me
//reads file contents and pushes them to the server array thingy
import path from 'path';
import fs from 'fs';
import { Logger } from '../src/NewLogger';
export var folderCounter:number = 0;
export var pushedCounter:number = 0;
var thisNameArray:Array<String> = [];
var thisContentArray:Array<String> = [];

//loads the notes from the folder contents
var jaja = path.join(__dirname, "contents");
const folders = fs.readdirSync(jaja).filter(folder => folder.endsWith("_data"));
for(const folder of folders)
{
    
    var newP1 = path.join(jaja, folder);
    //handles the text file that contains the text
    const txtfiles = fs.readdirSync(newP1).filter(file => file.endsWith(".txt"));
    for(const file of txtfiles)
    {
        var newP2 = path.join(newP1, file);
        fs.readFile(newP2,'utf-8' , (err, data)=>{
            if(err){
                console.error(err);
                return;
            }
            Logger(data, "DEBUG");
        });
    }
    //handles the json file that contains the text data that wants to be pushed to the server 
    const jsonfiles = fs.readdirSync(newP1).filter(file => file.endsWith(".json"));
    for(const file of jsonfiles)
    {
        var newP3 = path.join(newP1, file);
        const noteData = require(newP3);
        thisNameArray.push(noteData.name);
    }
}
