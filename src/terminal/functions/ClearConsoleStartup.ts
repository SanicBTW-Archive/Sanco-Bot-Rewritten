import { Logger } from '../../NewLogger';
import config from '../../data/config/TConf.json';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptName = config.options[1].optionName;
        var OptState = config.options[1].optionState;
        if(OptName == "clear console on startup") //just in case
        {
            switch(OptState)
            {
                case true:
                    console.clear();
                    Logger("Done clearing", "SUCCESS");
            }
        }
    }
}