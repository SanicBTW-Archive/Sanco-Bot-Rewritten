import path from 'path';
import fs from 'fs';
import { ConfigHelper} from './Configuration';

var configHelper = new ConfigHelper();

class FileSysOperations
{
    checkUserConfig(id:string)
    {
        configHelper.setNewValue("path", path.join(".", "per_user_config", id));
        if(!fs.existsSync(configHelper.getValue("path"))){ fs.mkdirSync(configHelper.getValue("path")); configHelper.setNewValue("pathExists", true); }
        else{ configHelper.setNewValue("pathExists", true); }
    }
}

export class PerUserConfig extends FileSysOperations
{
    constructor()
    {
        super();
    }

    init(id:string)
    {
        this.checkUserConfig(id);
        if(configHelper.getValue("pathExists"))
        {
            console.log("exists");
        }
    }
}