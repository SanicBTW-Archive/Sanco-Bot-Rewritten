import {Logger} from '../../NewLogger';
import { ReturnFields, ReturnOptionName, ReturnOptionValue } from '../../Returner';


module.exports = {
    exec: function(){
        var JsonFields = ReturnFields("TerminalConfig", 2);
        var OptName = ReturnOptionName(JsonFields);
        var OptVal = ReturnOptionValue(JsonFields);
        if(OptName == "terminal title") //just in case, again
        {
            if(OptVal != null) process.title = OptVal;
            else Logger("The option value is null, the title didn't change", "ERROR");
        }
    }
}