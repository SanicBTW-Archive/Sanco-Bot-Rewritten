import { Logger } from '../../NewLogger';
import config from '../../data/config/TConf.json';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptState = config.options[1].optionState;
        switch(OptState)
        {
            case true:
                console.clear();
                Logger("Done clearing", "SUCCESS");
        }
    }
}