import { Logger } from '../../NewLogger';
import {configuration} from '../../OptFHandler';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptState = configuration[0 + 2].optState;
        switch(OptState)
        {
            case "true":
                console.clear();
                Logger("Done clearing", "SUCCESS");
        }
    }
}