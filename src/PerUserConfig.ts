import path from 'path';
import fs from 'fs';

class FileSysOperations
{
    checkUserConfig(id:string)
    {
        this.path = path.join(".", "per_user_config", id);
        if(!fs.existsSync(this.path)){ fs.mkdirSync(this.path); this.pathExists = true; }
        else{ this.pathExists = true; }
    }

    set path(val:string) { this.path = val; } 
    get path() { return this.path; }

    set pathExists(val:boolean) { this.pathExists = val; }
    get pathExists() { return this.pathExists; }
}

export class PerUserConfig extends FileSysOperations
{
    constructor()
    {
        console.log("Starting Per User Config Handler");
        super();
    }

    init(id:string)
    {
        this.checkUserConfig(id);
        if(this.pathExists)
        {
            console.log("exists");
        }
    }
}