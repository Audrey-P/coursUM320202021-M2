'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

const fetch = require('node-fetch');
var https = require('https');
var cors = require('cors');

var corsOptions = {
    origin: 'https://Fleur09.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


//serves static files
app.use(express.static('docs'));


//ROUTES

app.get("/data", cors(corsOptions), function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&facet=rentree_lib&facet=etablissement_type2&facet=etablissement_type_lib&facet=etablissement_lib&facet=identifiant_eter&facet=champ_statistique&facet=operateur_lib&facet=localisation_etab&facet=localisation_ins&facet=bac_lib&facet=attrac_intern_lib&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_lib&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=reg_etab_lib&facet=com_ins_lib&facet=uucr_ins_lib&facet=dep_ins_lib&facet=aca_ins_lib&facet=reg_ins_lib" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log("fetchair", json);
        res.send("ça marche ou quooooiii");
    });
})



app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
