import express from 'express';
var app = express();
import { Logger } from '../NewLogger';
import { noteName, noteAlias, StartHandler, noteCreationDate, noteLastUpdate, noteRequest, noteList } from './MainHandler';
export var router = express.Router();
export var url = "http://localhost:5555";
export var urlReq = url + '/';
import Discord from 'discord.js';
import axios, { AxiosResponse } from 'axios';
import { coolTextFile } from '../Helper';

StartHandler(); //Why would i do this :clown:

app.use(router);

router.get('/', (req, res)=>{
    res.send("API Ver: 7")
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
        var notesxd = await coolTextFile(noteList);
        const helpMenu = new Discord.MessageEmbed()
        .setTitle('Notas')
        .setDescription(webapiv.data)
        .setColor('LIGHT_GREY')
        for(var i in notesxd)
        {
            helpMenu.addField(`Nombre de la nota: ${noteName[i]}\nCreada el: ${noteCreationDate[i]}\nActualizada el: ${noteLastUpdate[i]}\n`, `Alias para poder mostrar la nota: ${noteAlias[i]}`)
        }
        return helpMenu;
    }
    else
    {
        var newLesgo = noteAlias.indexOf(toReq);
        if(newLesgo == -1)
        {
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle('Oops - 404') //hard code it lol
            .setDescription('No pudimos encontrar eso, prueba otra vez')
            .setColor('RED');
            return errorEmbed;
        }
        resp = await axios.get(`${url}${noteRequest[newLesgo]}`);
        responseEmbed = new Discord.MessageEmbed()
        .setTitle(noteName[newLesgo])
        .setDescription(resp.data)
        .setColor('BLURPLE')
    }
    return responseEmbed;
}