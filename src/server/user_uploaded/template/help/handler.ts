import {router} from '../../../server';
import fs from 'fs';
import path from 'path';
import details from './data.json';

export var fileNameWExt = details.filename + ".txt";

module.exports = {  
    dataName: details.filename,
    noteAlias: details['filename-alias'],
    creationDate: details['creation-date'],
    reqUrl: details['request-url'],
    execute: function(){
        var file = path.join(__dirname, fileNameWExt);
        fs.readFile(file, "utf-8", (err, data) => {
            router.get(details['request-url'], (req, res) => {
                res.send(data);
            })
        })
    },
}