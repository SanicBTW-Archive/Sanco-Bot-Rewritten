import Discord from 'discord.js';
import { Logger } from './NewLogger';

export class eventHandler
{
    constructor(client:Discord.Client)
    {
        Logger("received client!", "DEBUG");
    }
}