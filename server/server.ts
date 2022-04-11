import express from 'express';
var app = express();
import { Logger } from '../src/NewLogger';
import { StartHandler } from './MainHandler';
export var router = express.Router();
export var url = "http://localhost:3000";
export var urlReq = url + '/';

StartHandler(); //Why would i do this :clown:

router.get(`/`, function(req,res){
    res.send("holis");
})

app.use(router);

export function startServer(){
    app.listen(3000, function() {
        Logger(`Node Server running on ${url}`,"SUCCESS");
    })
}