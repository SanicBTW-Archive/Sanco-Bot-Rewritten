//config handler
import TConf from '../data/config/TConf.json';
import { Logger } from '../NewLogger';
import { ReturnFields, ReturnOptionName, ReturnOptionState, ReturnOptionValue, ReturnFuncPath } from '../Returner';

export async function InitFunctions() 
{
    for(let uh = 1; uh < TConf.amount + 1; uh++) //the config amount field is really painful, i need to see when i can remove it to find a better way
    {
        var JsonFields = ReturnFields("TerminalConfig", uh);
        var OptionFunc = ReturnFuncPath(JsonFields);

        const optFunc = require(`./functions/${OptionFunc}`);
        optFunc.exec();

    }    
}