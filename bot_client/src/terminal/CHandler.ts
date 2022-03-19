//config handler
import TConf from '../data/settings/TConf.json';
import { Logger } from '../NewLogger';
import { ReturnFields, ReturnOptionName, ReturnOptionState, ReturnOptionValue, ReturnFuncPath } from '../Returner';

//heavily based off the original config handler from sanic bot
export async function InitFunctions() 
{
    for(let uh = 1; uh < TConf.amount + 1; uh++)
    {
        var JsonFields = ReturnFields("TerminalConfig", uh);
        var OptionFunc = ReturnFuncPath(JsonFields);

        const optFunc = require(`./functions/${OptionFunc}`);
        optFunc.exec();

    }    
}