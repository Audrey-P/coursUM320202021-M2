'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

const fetch = require('node-fetch');


app.get("/", function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public/api/?disjunctive.rentree_lib&fbclid=IwAR00KsUgXQS9VYqlSkteRHighaGmmEf7hSw2mG6bcTs0c_znnUIkn9Ip_5Q" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        res.send("fetch okkkkk");
    });
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
