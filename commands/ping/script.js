const { ConfigHelper } = require('../../src/Configuration');
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
    
            if (args[0] === "ping") 
            {
                console.log("true");
                //perUserConfig.init(message.author.id);
                const calcping = new Discord.MessageEmbed()
                .setTitle('Calculando el ping...');
        
                message.channel.send({embeds:[calcping]}).then(resultMessage => {
                    const msgpingsomething = resultMessage.createdTimestamp - message.createdTimestamp;
        
                    const pingresult = new Discord.MessageEmbed()
                    .setTitle('Pong! :ping_pong:')
                    .addFields
                    (
                        { name: 'Latencia del bot ', value: `${msgpingsomething}ms`, inline: true},
                        { name: 'Ping del bot ', value: `${client.ws.ping}ms`, inline: true},
                    ).setColor('GREEN');
        
                    resultMessage.edit({embeds: [pingresult]});
                });
            }
        });
    }
}