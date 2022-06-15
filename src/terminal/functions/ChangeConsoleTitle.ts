import {Logger} from '../../NewLogger';
import {getOptionField} from '../../OptFHandler';

module.exports = {
    alias: "change-title",
    exec: function(){
        var OptVal = getOptionField(3);
        if(OptVal != null) process.title = OptVal;
        else Logger("The option value is null, the title didn't change", "ERROR");
    }
}