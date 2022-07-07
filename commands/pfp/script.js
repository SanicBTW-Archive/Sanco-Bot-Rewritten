const { ConfigHelper } = require('../../src/Configuration');
const {perUserConfig} = require('../../index');
const Discord = require('discord.js');

var prefix = new ConfigHelper().getValue("prefix");

module.exports = 
{
    init: function(client)
    {
        client.on('messageCreate', (message) => {
            if (!message.content.startsWith(prefix) || message.author.bot)
                return;
            let args = message.content.substring(prefix.length).split(" ");
    
            if (args[0] === "pfp") 
            {
                //perUserConfig.init(message.author.id);
                console.log("true");
            }
        });
    }
}