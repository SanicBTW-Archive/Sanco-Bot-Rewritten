import fs from 'fs';
import * as readline from 'readline';

var tokenDir = __dirname + '/Secrets/Token.json';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please input your token: ", (tokenjaja) => {
    if(tokenjaja.length == 59){
        const tokentable = {"token": tokenjaja};
        const tokenjson = JSON.stringify(tokentable);
        fs.writeFileSync(tokenDir, tokenjson);
        console.log("Token seems to be saved");
        process.exit(0);
    } else {
        console.log("Not a token, check again");
        process.exit(0);
    }
});