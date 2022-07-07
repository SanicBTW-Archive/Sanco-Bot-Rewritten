import { ConfigHelper } from '../../Configuration';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptState = new ConfigHelper().getValue("clear console on startup");
        switch(OptState)
        {
            case "true":
                console.clear();
        }
    }
}