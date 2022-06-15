import { Logger } from '../../NewLogger';
import {getOptionField} from '../../OptFHandler';

module.exports = {
    alias: "clear-console",
    exec: function(){
        var OptState = getOptionField(2);
        switch(OptState)
        {
            case "true":
                console.clear();
                Logger("Done clearing", "SUCCESS");
        }
    }
}