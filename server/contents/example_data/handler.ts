//This is the handler for this folder
import {router} from '../../server';
import fs from 'fs';
import path from 'path';

module.exports = {  
    execute: function(){
        var file = path.join(__dirname, "pushThisOne.txt");
        fs.readFile(file, "utf-8", (err, data) => {
            router.get(`/pushthisone`, (req, res) => {
                res.send(data);
            })
        })
    },
}