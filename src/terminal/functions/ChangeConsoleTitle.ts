import {Logger} from '../../NewLogger';
import config from '../../data/config/TConf.json';

module.exports = {
    exec: function(){
        var OptName = config.options[2].optionName;
        var OptVal = config.options[2].optionValue;
        if(OptName == "terminal title") //just in case, again
        {
            if(OptVal != null) process.title = OptVal;
            else Logger("The option value is null, the title didn't change", "ERROR");
        }
    }
}