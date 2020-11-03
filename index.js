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

//fetch univ et parcoursup
app.get("/data/univs", cors(corsOptions), function(req, res){
    let univs = []; //creation tableau vide
    let url1 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&facet=rentree_lib&facet=etablissement_type2&facet=etablissement_type_lib&facet=etablissement_lib&facet=identifiant_eter&facet=champ_statistique&facet=operateur_lib&facet=localisation_etab&facet=localisation_ins&facet=bac_lib&facet=attrac_intern_lib&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_lib&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=reg_etab_lib&facet=com_ins_lib&facet=uucr_ins_lib&facet=dep_ins_lib&facet=aca_ins_lib&facet=reg_ins_lib&refine.bac_lib=S%C3%A9rie+L" ;
    fetch(url1)
    .then(res => res.json())
    .then(json => {
        console.log("fetch", json);

    let records = json.records; // on reccupere records car c est le tableau qui nous interesse 
    records.forEach(function(record){
        let univ = {}; //objet vide
        univ.id = record.etablissement; // a completer - correspondance entre donnees fetch et nom colonnes dans tableau

        let url2 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&sort=tri&facet=session&facet=contrat_etab&facet=cod_uai&facet=g_ea_lib_vx&facet=dep_lib&facet=region_etab_aff&facet=acad_mies&facet=fili&facet=form_lib_voe_acc&facet=regr_forma&facet=fil_lib_voe_acc&facet=detail_forma&facet=tri&timezone=Europe%2FBerlin";
        fetch(url2)
        .then(res => res.json())
        .then(json => {
            console.log("fetch", json);

            records.forEach(function(record2){
            if (univ.id == record2.cod_aui){
                //univ. // a finir
            };
            });
        records.push(univ)
        });
    });
    res.send(records) //renvoie la collection d'universites
    });

//A fetch to get only serieL
app.get("/data/serieL", cors(corsOptions), function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&facet=rentree_lib&facet=etablissement_type2&facet=etablissement_type_lib&facet=etablissement_lib&facet=identifiant_eter&facet=champ_statistique&facet=operateur_lib&facet=localisation_etab&facet=localisation_ins&facet=bac_lib&facet=attrac_intern_lib&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_lib&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=reg_etab_lib&facet=com_ins_lib&facet=uucr_ins_lib&facet=dep_ins_lib&facet=aca_ins_lib&facet=reg_ins_lib&refine.bac_lib=S%C3%A9rie+L" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log("fetch", json);
        res.send("Série L");
    });
})

//A fetch to get Parcoursup data
app.get("/data/Parcoursup", cors(corsOptions), function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&sort=tri&facet=session&facet=contrat_etab&facet=cod_uai&facet=g_ea_lib_vx&facet=dep_lib&facet=region_etab_aff&facet=acad_mies&facet=fili&facet=form_lib_voe_acc&facet=regr_forma&facet=fil_lib_voe_acc&facet=detail_forma&facet=tri&timezone=Europe%2FBerlin" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log("fetch", json);
        res.send("Parcoursup");
    });
})

/*
app.get("/requestair/data", function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&facet=rentree_lib&facet=etablissement_type2&facet=etablissement_type_lib&facet=etablissement_lib&facet=identifiant_eter&facet=champ_statistique&facet=operateur_lib&facet=localisation_etab&facet=localisation_ins&facet=bac_lib&facet=attrac_intern_lib&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_lib&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=reg_etab_lib&facet=com_ins_lib&facet=uucr_ins_lib&facet=dep_ins_lib&facet=aca_ins_lib&facet=reg_ins_lib" ;
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
*/


app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
