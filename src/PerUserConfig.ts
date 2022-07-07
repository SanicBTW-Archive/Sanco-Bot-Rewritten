import path from 'path';
import fs from 'fs';
import { ConfigHelper} from './Configuration';
import { scanDir, writeFile } from './Helper';

var configHelper = new ConfigHelper();

configHelper.setNewValue("path", null);
configHelper.setNewValue("pathExists", false);
configHelper.setNewValue("required files exists", false);

class FileSysOperations
{
    //scans the dir on call or startup on index.ts, for easier implementation of config
    scanPerUserConfigFolder()
    {
        var userConfigPath = path.join(".", "per_user_config");
        
        var usersConfig = scanDir(userConfigPath);
        for(var i in usersConfig)
        {
            //as we are 100% sure that the file exists we proceed, will implement a failsafe in the next version i guess
            var prefixFile = path.join(userConfigPath, usersConfig[i], "prefix");

            var indexer = `${usersConfig[i]}prefix`;
            configHelper.setNewValue(indexer, fs.readFileSync(prefixFile, 'utf-8'));
        }
    }

    //checks the user config path, using the user id
    checkUserConfigFolder(id:string)
    {
        configHelper.setNewValue("path", path.join(".", "per_user_config", id));
        if(!fs.existsSync(configHelper.getValue("path"))){ fs.mkdirSync(configHelper.getValue("path")); configHelper.setNewValue("pathExists", true); }
        else{ configHelper.setNewValue("pathExists", true); }
    }

    //checks if the required files exists, might hard code the path or something
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
        this.scanPerUserConfigFolder();
    }

    checkUserIDConfig(id:string)
    {
        if(!configHelper.getValue("pathExists")){ this.checkUserConfigFolder(id); }
        if(!configHelper.getValue("required files exists")) { this.checkUserConfigFiles(configHelper.getValue("path")); }
    }
}