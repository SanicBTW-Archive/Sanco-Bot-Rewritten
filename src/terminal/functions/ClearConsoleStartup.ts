import { Logger } from '../../NewLogger';
import { ReturnFields, ReturnOptionName, ReturnOptionState } from '../../Returner';

module.exports = {
    exec: function(){
        var JsonFields = ReturnFields("TerminalConfig", 1);
        var OptName = ReturnOptionName(JsonFields);
        var OptState = ReturnOptionState(JsonFields);
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