import express from 'express';
var app = express();
import { Logger } from '../src/NewLogger';
import { notesName, notesAlias, StartHandler, notesCreationDate, notesLastUpdate, notesRequest } from './MainHandler';
export var router = express.Router();
export var url = "http://localhost:3000";
export var urlReq = url + '/';
import Discord from 'discord.js';
import axios, { AxiosResponse } from 'axios';

StartHandler(); //Why would i do this :clown:

app.use(router);

export function startServer(){
    app.listen(3000, function() {
        Logger(`Node Server running on ${url}`,"SUCCESS");
    })
}

export async function requestNote(toReq:string):Promise<Discord.MessageEmbed>
{
    let responseEmbed = new Discord.MessageEmbed()
    let resp:AxiosResponse;
    if(toReq == null)
    {
        const helpMenu = new Discord.MessageEmbed()
        .setTitle('Notas')
        .addFields
        (
            {name: `Nombre de la nota: ${notesName[0]}\nFue creada el: ${notesCreationDate[0]}\nUltima vez actualizada el: ${notesLastUpdate[0]}`, value: `${notesAlias[0]}`},
            {name: `Nombre de la nota: ${notesName[1]}\nFue creada el: ${notesCreationDate[1]}\nUltima vez actualizada el: ${notesLastUpdate[0]}`, value: `${notesAlias[1]}`}
        )
        return helpMenu;
    }
    else
    {
        var letsgo = doCheck(toReq);
        resp = await axios.get(`${url}${notesRequest[letsgo]}`);
        responseEmbed = new Discord.MessageEmbed()
        .setTitle(notesName[letsgo])
        .setDescription(resp.data)
    }
    return responseEmbed;
}

function doCheck(jaja:string):number
{
    var current = 0;
    switch(jaja)
    {
        case notesAlias[0]:
            current = 0;
            break;
        case notesAlias[1]:
            current = 1;
            break;
    }
    return current;
}