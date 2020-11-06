'use strict'

var express = require('express');
var app = express();
var csv = require('csv-parser');
var decodeStream = require('iconv-lite').decodeStream;

const port = process.env.PORT || 3000 ;

var fetch = require('node-fetch');

let univs = [];
let url1 = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public/download/?format=csv&disjunctive.rentree_lib=true&refine.rentree_lib=2018-19&timezone=Europe/Berlin&lang=fr&use_labels_for_header=true&csv_separator=%3B" ;

fetch(url1).then(resp => {
    console.log("processing CSV gonna wait");
    const stream = resp.body.pipe(decodeStream('win1252'));
    const etsP = new Promise((resolve, reject) =>
        stream.pipe(csv({
            separator: ';'
          }),
          ).on('error', reject)
          .on('data', etablissement => {
              var etab = {};
            etab.codeetab = etablissement.ETABLISSEMENT ;
            etab.nom = etablissement.Etablissement ;
            univs.push(etab);
          })
    )
    Promise.all([etsP]).then(
        function() {
            console.log("univs.length", univs.length);
            startserveur();
        }
    );
        
})

function startserveur()
{
    app.listen(port, function () {

        console.log('Serveur listening on port ' + port);
    });
}
