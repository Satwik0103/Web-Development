const http = require('http');
const app = require("express")();
const fs = require('fs');
const path = require('path');
const websocketServer = require("websocket").server;
const { callbackify } = require('util');
//hashmap clients
const clients = {};
const games = {};

const httpServer=http.createServer(function(req, res){

    if(req.url === "/"){
        fs.readFile("home1.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
        
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else if(req.url.match("\.jpg$")){
        var imagesPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagesPath);
        res.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(res);
    } else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }

}).listen(3000);

const wsServer = new websocketServer({
    "httpServer": httpServer
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        //I have received a message from the client
        //a user want to create a new game
        //console.log(result)
        
        if (result.method === "create") {
            const clientId = result.clientId;
            const gameId = guid();
            games[gameId] = {
                "id": gameId,
                "clients": []
            }

            const payLoad = {
                "method": "create",
                "game" : games[gameId]
            }

            const con = clients[clientId].connection;
            con.send(JSON.stringify(payLoad));
        }

        //a client want to join
        if (result.method === "join") {

            const clientId = result.clientId;
             const gameId = result.gameId;
            const game = games[gameId];
            if (game.clients.length >= 4) 
            {
                //sorry max players reach
                return;
            }
            const color =  {"0": "Red", "1": "Green", "2": "Blue","3":"Yellow"}[game.clients.length]
            game.clients.push({
                "clientId": clientId,
                "color": color
            })
            //start the game
            if (game.clients.length === 4) updateGameState();

            const payLoad = {
                "method": "join",
                "game": game
            }
            //loop through all clients and tell them that people has joined
            game.clients.forEach(c => {
                clients[c.clientId].connection.send(JSON.stringify(payLoad))
            })
        }
        const d=0;
        const e=0;
        const score=0;
        const fscore=0;
        //a user plays
        if (result.method === "play") {
            const gameId = result.gameId;
            const FishNo = result.FishNo;
            const FishiNo=result.FishiNo;
            const color = result.color;
            //let state = games[gameId].state;
            if (FishNo==1){
                d=d++;
            console.log("1Fishcount"+d);}
            if(FishiNo==1){
            e=e++;
            console.log("2Fish count"+e);}
            calcul();

           // state[ballId] = color;
           // games[gameId].state = state;
        }
        function calcul(){
            if(d==4){
                score=25;
            }
            else if(e==4){
                score=-25;
            }
            else if(d==3&&e==1)
            {
                if(FishiNo==1)
                score=75;
                else
                score=0;
            }
            else if(d==2&&e==2)
            {
                if(FishiNo==1)
                score=50;
                else
                score=-12.5;
            }
            else if(d==1&&e==3)
            {
                if(FishiNo==1)
                score=25;
                else
                score=-25;
            }
        
        fscore=fscore+score;
        const payLoad = {
            "method": "update",
            "fscore":fscore,
            "score":score
        }
        game.clients.forEach(c=> {
            clients[c.clientId].connection.send(JSON.stringify(payLoad))
        })
    }
    })

    //generate a new clientId
    const clientId = guid();
    clients[clientId] = {
        "connection":  connection
    }
//Sending from server
    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    //send back the client connect
    connection.send(JSON.stringify(payLoad))

})


function updateGameState(){

    //{"gameid", fasdfsf}
    for (const g of Object.keys(games)) {
        const game = games[g]
        const payLoad = {
            "method": "update",
            "game": game
        }

        game.clients.forEach(c=> {
            clients[c.clientId].connection.send(JSON.stringify(payLoad))
        })
    }

    setTimeout(updateGameState, 500);
}
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
 