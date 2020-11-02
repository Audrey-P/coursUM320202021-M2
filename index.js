'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

const fetch = require('node-fetch');


app.get("/", function(req, res){
    res.send("helloW!");
})

app.get("/fetchair/shangai", function(req, res){
    let url = "http://api.waqi.info/feed/shanghai/?token=demo" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        res.send("data fetched look your console");
    });
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
