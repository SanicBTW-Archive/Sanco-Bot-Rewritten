//This is the handler for this folder
import {router} from '../../server';
import fs from 'fs';
import path from 'path';
import details from './data.json';

module.exports = {  
    dataName: details.name,
    noteAlias: details['note-alias'],
    creationDate: details['creation-date'],
    lastUpdate: details['last-update'],
    reqUrl: details['request-url'],
    locked: details.locked,
    passwdToUnlock: details.password,
    execute: function(){
        var file = path.join(__dirname, "pushThisOne.txt");
        fs.readFile(file, "utf-8", (err, data) => {
            router.get(details['request-url'], (req, res) => {
                res.send(data);
            })
        })
    },
}