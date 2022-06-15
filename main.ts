import { startBot } from '.';
import {setupOptionFile, configuration} from './src/OptFHandler';

//setups config stuff
setupOptionFile('./src/settings.optf');
export var prefix = configuration[0].optState;
export var presenceName = configuration[0 + 1].optState; //kind of easy bypass i guess

startBot();