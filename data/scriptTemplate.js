//to get config helper for prefix
const { ConfigHelper } = require('../../src/Configuration');
//just in case u gonna use this
const Discord = require('discord.js');
//for per user config
const {perUserConfig} = require('../../index');

//get the prefix
var prefix = new ConfigHelper().getValue("prefix");

//export module
module.exports = 
{
    //export function which requires the client as an argument (no intellisense lol)
    //might change the function name or soemthing
    init: function(client)
    {
        //this was previously on the index.ts file on message create, its just basic command handling stuff
        client.on('messageCreate', (message) => {
            if (!message.content.startsWith(prefix) || message.author.bot)
                return;
            let args = message.content.substring(prefix.length).split(" ");
    
            if (args[0] === "command")
            {
                //check every time the command is fired, idk any other way sorry, thats why i made this sick command support
                perUserConfig.init(message.author.id);
                console.log("true");
            }
        });
    }
}