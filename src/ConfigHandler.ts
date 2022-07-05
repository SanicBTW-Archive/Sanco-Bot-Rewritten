import fs from 'fs';

var Configuration:any = new Object();

export var Ignore:any = new Object();

export class Config
{
    constructor(path:string)
    {
        var file = fs.readFileSync(path, "utf-8");
        var fileParse = JSON.parse(file);

        var availableCategories = fileParse.categories;
        for(var i in availableCategories)
        {
            var category = availableCategories[i];
            if(category === "Ignore users")
            {
                var usersToIgnore = fileParse.configuration[category];
                for(var d in usersToIgnore)
                {
                    var userIndex = d;
                    var userID = usersToIgnore[d];

                    Ignore[userIndex] = userID;
                }
            }
            else
            {
                var catSettings = fileParse.configuration[category];
                for(var j in catSettings)
                {
                    var setting = j;
                    var settingValue = catSettings[j];
    
                    Configuration[setting] = settingValue;
                }
            }
        }
    }
}

export class ConfigHelper
{
    getValue(index:any)
    {
        return Configuration[index];
    }

    setNewValue(index:any, value:any)
    {
        Configuration[index] = value;
    }
}
