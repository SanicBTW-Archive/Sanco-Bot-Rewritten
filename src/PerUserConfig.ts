import path from 'path';
import fs from 'fs';
import { ConfigHelper} from './Configuration';
import { writeFile } from './Helper';

var configHelper = new ConfigHelper();

configHelper.setNewValue("path", null);
configHelper.setNewValue("pathExists", false);
configHelper.setNewValue("required files exists", false);

class FileSysOperations
{
    //checks the user config path, using the user id
    checkUserConfigFolder(id:string)
    {
        configHelper.setNewValue("path", path.join(".", "per_user_config", id));
        if(!fs.existsSync(configHelper.getValue("path"))){ fs.mkdirSync(configHelper.getValue("path")); configHelper.setNewValue("pathExists", true); }
        else{ configHelper.setNewValue("pathExists", true); }
    }

    checkUserConfigFiles(userConfigPath:string)
    {
        var prefixFile = path.join(userConfigPath, "prefix");
        if(!fs.existsSync(prefixFile)){ writeFile(prefixFile, configHelper.getValue("prefix")); configHelper.setNewValue("required files exists", true); }
        if(fs.existsSync(prefixFile)){ configHelper.setNewValue("userPrefix", fs.readFileSync(prefixFile, 'utf-8')); configHelper.setNewValue("required files exists", true); }
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
        if(!configHelper.getValue("pathExists"))
        {
            this.checkUserConfigFolder(id);
        }
        if(!configHelper.getValue("required files exists"))
        {
            this.checkUserConfigFiles(configHelper.getValue("path"));
        }
    }
}