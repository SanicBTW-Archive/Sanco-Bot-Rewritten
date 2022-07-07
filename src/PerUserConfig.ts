import path from 'path';
import fs from 'fs';
import { ConfigHelper} from './Configuration';
import { scanDir, writeFile } from './Helper';

var configHelper = new ConfigHelper();

configHelper.setNewValue("path", null);

class FileSysOperations
{
    //scans the dir on call or startup on index.ts, for easier implementation of config
    scanPerUserConfigFolder()
    {
        var userConfigPath = path.join(".", "users");
        
        var usersConfig = scanDir(userConfigPath);
        for(var i in usersConfig)
        {
            var prefixFile = path.join(userConfigPath, usersConfig[i], "userConfig", "prefix");

            var indexer = `${usersConfig[i]}prefix`;
            if(fs.existsSync(prefixFile)){ configHelper.setNewValue(indexer, fs.readFileSync(prefixFile, 'utf-8')); }
            else{ writeFile(prefixFile, configHelper.getValue("defaultPrefix")); }
        }
    }

    //checks the user config path, using the user id
    createConfigFolder(id:string)
    {
        configHelper.setNewValue("path", path.join(".", "users", id, "userConfig"));
        if(!fs.existsSync(configHelper.getValue("path"))){ fs.mkdirSync(configHelper.getValue("path")); }
    }

    //checks if the required files exists
    createConfigEssentials(id:string)
    {
        var mainPath = configHelper.getValue("path");
        var prefixFile = path.join(mainPath, "prefix");
        
        var prefixIndexer = `${id}prefix`;

        if(!fs.existsSync(prefixFile))
        { 
            writeFile(prefixFile, configHelper.getValue("defaultPrefix"));
            configHelper.setNewValue(prefixIndexer, fs.readFileSync(prefixFile, 'utf-8'));
        }
    }
}

export class PerUserConfig extends FileSysOperations
{
    constructor()
    {
        super();
        this.scanPerUserConfigFolder();
    }

    createConfig(id:string)
    {
        this.createConfigFolder(id);
        this.createConfigEssentials(id);
    }
}

//modules
export function changePrefix(id:string, newPrefix:string)
{
    //these are from above, sorry lol
    configHelper.setNewValue("path", path.join(".", "users", id, "userConfig"));
    var mainPath = configHelper.getValue("path");
    var prefixFile = path.join(mainPath, "prefix");

    configHelper.setNewValue(`${id}prefix`, newPrefix);
    writeFile(prefixFile, configHelper.getValue(`${id}prefix`));
}