import express from 'express';
var app = express();
import { Logger } from '../NewLogger';
import { noteName, noteAlias, StartHandler, noteCreationDate, noteLastUpdate, noteRequest, noteList, noteLocked, notePasswd, useFile, notesFolder } from './MainHandler';
export var router = express.Router();
export var url = "http://localhost:5555";
export var urlReq = url + '/';
import Discord from 'discord.js';
import axios, { AxiosResponse } from 'axios';
import { coolTextFile, scanDir } from '../Helper';

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

export async function requestNote(toReq:string, password?:string):Promise<Discord.MessageEmbed>
{
    let responseEmbed = new Discord.MessageEmbed()
    let resp:AxiosResponse;
    if(toReq == null)
    {
        var notesxd:string[];
        const webapiv = await axios.get(`${url}/`);
        if(useFile)
        {
            notesxd = await coolTextFile(noteList);
        }
        else
        {
            notesxd = await scanDir(notesFolder);
        }
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
        if(noteLocked[newLesgo] == true && password == null)
        {
            //would've made it so it waits 10s until the password its said
            const noteLocked = new Discord.MessageEmbed()
            .setTitle('Nota bloqueada! - 403') //aka forbidden
            .setDescription('Esta nota esta bloqueada por una contraseña, ejecuta el comando otra vez con la contraseña `s?req <nota> <contraseña>`')
            .setColor('RED');
            return noteLocked;
        }
        else if(noteLocked[newLesgo] == true && password != notePasswd[newLesgo])
        {
            const wrongPass = new Discord.MessageEmbed()
            .setTitle('Contraseña incorrecta')
            .setColor('RED');
            return wrongPass;
        }
        resp = await axios.get(`${url}${noteRequest[newLesgo]}`);
        responseEmbed = new Discord.MessageEmbed()
        .setTitle(noteName[newLesgo])
        .setDescription(resp.data)
        .setColor('BLURPLE')
    }
    return responseEmbed;
}