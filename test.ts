import { setupOptionFile, configuration } from "./src/testing/OptFHandler";
var hola = './src/testing/settings.optf';
import path from 'path';

async function holaaa(){
    await setupOptionFile(hola);
    console.table(configuration);
}
holaaa();