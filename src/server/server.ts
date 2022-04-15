import express, { response } from 'express';
var app = express();
import { Logger } from '../NewLogger';
import { dataName, dataAlias, StartHandler, dataCreationDate, dataLastUpdate, dataRequest, dataList } from './MainHandler';
export var router = express.Router();
export var url = "http://localhost:5555";
export var urlReq = url + '/';
import Discord from 'discord.js';
import axios, { AxiosResponse } from 'axios';
import { coolTextFile } from '../Helper';

StartHandler(); //Why would i do this :clown:

app.use(router);

router.get('/', (req, res)=>{
    res.send("API Ver: 6")
})

export function startServer(){
    app.listen(5555, function() {
        Logger(`Node Server running on ${url}`,"SUCCESS");
    })
}

export async function requestNote(toReq:string):Promise<Discord.MessageEmbed>
{
    let responseEmbed = new Discord.MessageEmbed()
    let resp:AxiosResponse;
    if(toReq == null)
    {
        const webapiv = await axios.get(`${url}/`);
        var dataxd = await coolTextFile(dataList);
        const helpMenu = new Discord.MessageEmbed()
        .setTitle('Datos')
        .setDescription(webapiv.data)
        for(var i in dataxd)
        {
            helpMenu.addField(`${dataName[i]}`, `${dataAlias[i]}`, true)
        }
        return helpMenu;
    }
    else
    {
        var letsgo = doCheck(toReq);
        if(letsgo == 999999999)
        {
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Oops - 404') //hard code it lol
            .setDescription('No pudimos encontrar eso, prueba otra vez')
            .setColor('RED');
            return errorEmbed;
        }
        resp = await axios.get(`${url}${dataRequest[letsgo]}`);
        responseEmbed = new Discord.MessageEmbed()
        .setTitle(dataName[letsgo])
        .setDescription(resp.data)
    }
    return responseEmbed;
}

function doCheck(jaja:string):number
{
    var current = 0;
    switch(jaja)
    {
        default:
            current = 999999999;  //couldnt find that one
            break;
        case dataAlias[0]:
            current = 0;
            break;
        case dataAlias[1]:
            current = 1;
            break;
    }
    return current;
}