import { ConfigHelper } from '../../Configuration';

module.exports = {
    alias: "change-title",
    exec: function(){
        var OptVal = new ConfigHelper().getValue("terminal title");
        if(OptVal != null) process.title = OptVal;
        else throw console.log("The option value is null, the title didn't change");
    }
}