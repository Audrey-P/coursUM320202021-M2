'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

var fetch = require('node-fetch');
var https = require('https');
var fs = require("fs"); // Pour lire fichier xml *******

var cors = require('cors');

var corsOptions = {
    origin: 'https://Audrey-P.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//init some date fetched somewhere
let initjson = {};

async function initialize()
{
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&rows=100&sort=-rentree&refine.rentree_lib=2018-19" ;
    initjson = await fetch(url).then(response => response.json());
    console.log("initjson", initjson);
    console.log("now can start server");

    //serves static files
    app.use(express.static('docs'));

    //ROUTES

/*
    app.get("/fetch/:region", cors(corsOptions), function(req, res){
		
		let data_region = req.params.region;
        let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&rows=100&sort=-rentree&refine.rentree_lib=2018-19&refine.reg_ins_lib="+ data_region ;
        fetch(url)
        .then(res => res.json())
        .then(json => {
			let univs = [];
			let univ = {};
			json.records.forEach(function(record){
				univ.id = record.fields.etablissement;
				univ.rentree = record.fields.rentree;
				univ.academie = record.fields.aca_etab_lib;
				univ.commune = record.fields.com_etab_lib;
				univ.region = record.fields.reg_etab_lib;
				univ.wiki = record.fields.element_wikidata;
				univ.departement = record.fields.dep_etab_lib;
				univ.nometablissement = record.fields.etablissement_lib;
				univ.typeetablissement = record.fields.etablissement_type_lib;
				univ.type2 = record.fields.etablissement_type2;
				univ.uucr = record.fields.uucr_etab_lib;
				univ.eff = record.fields.effectif_total;
				
				univs.push(univ);
			})
			console.log(univs);
			res.send(univs);

            res.format({
                'text/html': function () {
                res.send("data fetched look your console");
                },
                'application/json': function () {
                    res.setHeader('Content-disposition', 'attachment; filename=score.json'); //do nothing
                    res.set('Content-Type', 'application/json');
                    res.json(json);
                },

			      })
        });
    })
*/

app.get("/rdfvocabulary", cors(corsOptions), function(req, res){
    res.setHeader('Access-Control-Allow-Origin', corsOrigins);

    //let filePath = path.join('docs', 'rdfvocabulary.xml');

    let xml = fs.readFileSync('docs/RDF.xml');

    res.setHeader('Content-disposition', 'attachment; filename=RDF.xml');
    res.set('Content-Type', 'application/xml');

    res.send(xml);
})


    app.listen(port, function () {

        console.log('Serveur listening on port ' + port);
    });
}

initialize();

