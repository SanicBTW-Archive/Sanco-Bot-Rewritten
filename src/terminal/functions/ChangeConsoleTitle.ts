import {Logger} from '../../NewLogger';
import {configuration} from '../../OptFHandler';

module.exports = {
    alias: "change-title",
    exec: function(){
        var OptVal = configuration[0 + 3].optState;
        if(OptVal != null) process.title = OptVal;
        else Logger("The option value is null, the title didn't change", "ERROR");
    }
}