import { Logger } from '../../NewLogger';
import { ConfigHelper } from '../../ConfigHandler';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptState = new ConfigHelper().getValue("clear console on startup");
        switch(OptState)
        {
            case "true":
                console.clear();
                Logger("Done clearing", "SUCCESS");
        }
    }
}