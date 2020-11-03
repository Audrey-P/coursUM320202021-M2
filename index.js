'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3001 ;

var fetch = require('node-fetch');
var https = require('https');


var cors = require('cors');

var corsOptions = {
    origin: 'https://natoine.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


//init some date fetched somewhere
let initjson = {};

async function initialize()
{
    let url = "http://api.waqi.info/feed/shanghai/?token=demo" ;
    initjson = await fetch(url).then(response => response.json());
    console.log("initjson", initjson);
    console.log("now can start server");

    //serves static files
    app.use(express.static('docs'));

    //ROUTES

    app.get("/:name", function(req, res){
        res.send("hello : " + req.params.name );
    })

    app.get("/fetchair/shangai", cors(corsOptions), function(req, res){
        let url = "http://api.waqi.info/feed/shanghai/?token=demo" ;
        fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log("fetchair", json);

            res.format({
                'text/html': function () {
                res.send("data fetched look your console");
                },
                'application/json': function () {
                    res.setHeader('Content-disposition', 'attachment; filename=score.json'); //do nothing
                    res.set('Content-Type', 'application/json');
                    res.json(json);
                }
                })
        });
    })

    app.get("/requestair/shangai", function(req, res){
        let url = "https://api.waqi.info/feed/shanghai/?token=demo" ;
        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log("requestair", JSON.parse(data));
                res.send("data requested look your console");
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.send("nope request didnt work");
        });
    })

    app.listen(port, function () {

        console.log('Serveur listening on port ' + port);
    });
}

initialize();