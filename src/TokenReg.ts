import fs from 'fs';
import path from 'path';
import * as readline from 'readline';

var tokenFile = path.join(__dirname,'data', 'secrets', 'Token.json');
var tokenDir = path.join(__dirname,'data', 'secrets');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
fs.mkdir(tokenDir, () => {});

rl.question("Please input your token: ", (tokenjaja) => {
    if(tokenjaja.length == 59){
        const tokentable = {"token": tokenjaja};
        const tokenjson = JSON.stringify(tokentable);
        fs.writeFileSync(tokenFile, tokenjson);
        console.log("Token seems to be saved");
        process.exit(0);
    } else {
        console.log("Not a token, check again");
        process.exit(0);
    }
});