import {Logger} from '../../NewLogger';
import config from '../../data/config/TConf.json';

module.exports = {
    alias: "change-title",
    exec: function(){
        var OptVal = config.options[2].optionValue;
        if(OptVal != null) process.title = OptVal;
        else Logger("The option value is null, the title didn't change", "ERROR");
    }
}