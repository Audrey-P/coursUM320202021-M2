'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

var fetch = require('node-fetch');
var https = require('https');


var cors = require('cors');

var corsOptions = {
    origin: 'https://natoine.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }




async function initialize()
{
    //serves static files
    app.use(express.static('docs'));

    //ROUTES

    app.get("/univs/:region", cors(corsOptions), function(req, res){
		let data_region = req.params.region;
		let univs = [];
        let url1 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement&q=&rows=100&sort=-rentree&refine.rentree_lib=2018-19&refine.reg_etab_lib="+data_region ;
		let url2 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=1000&sort=tri&refine.region_etab_aff="+data_region+"&timezone=Europe%2FBerlin";
		
        Promise.all([
			fetch(url1),
			fetch(url2)
		]).then(function (responses) {
			// Get a JSON object from each of the responses
			return Promise.all(responses.map(function (response) {
				return response.json();
			}));
		}).then(function(json){
			let records1 = json[0].records;
			let records2 = json[1].records;
			let univ = {};
			
			records1.forEach(function(record){
				univ.id = record.fields.etablissement;
				univ.commune = record.fields.com_etab_lib;
				univ.region = record.fields.reg_etab_lib;
				univ.wiki = record.fields.element_wikidata;
				univ.departement = record.fields.dep_etab_lib;
				univ.nometablissement = record.fields.etablissement_lib;
				univ.typeetablissement = record.fields.etablissement_type_lib;
				univ.effectif = record.fields.effectif;
				univ.capacEtab = 0;
				univ.effCandidat = 0;
				univ.effCandPPrincipale = 0;
				univ.effCandPSecond = 0;
				univ.effCandAccPorpos = 0;
				univ.effCandAdmisPrinc = 0;
				univ.effCandPAdmisSecond = 0;
				
				records2.forEach(function(record2){
					if (univ.id == record2.fields.cod_uai){
						univ.capacEtab += record2.fields.capa_fin;
						univ.effCandidat += record2.fields.voe_tot;
						univ.effCandPPrincipale += record2.fields.nb_voe_pp;
						univ.effCandPSecond += record2.fields.nb_voe_pc;
						univ.effCandAccPorpos += record2.fields.acc_tot;
						univ.effCandAdmisPrinc += record2.fields.acc_pp;
						univ.effCandPAdmisSecond += record2.fields.acc_pc;
						
					}
					else{
						return;
					};
				});
				univs.push(univ);
			})
			console.log(univs.length);
			console.log(univs[0]);

            res.format({
                'application/json': function () {
                    res.setHeader('Content-disposition', 'attachment; filename=univs.json'); //do nothing
                    res.set('Content-Type', 'application/json');
                    res.json(univs); // Modif json en univs
                },
			})
        });
    })
	
   app.get("/etab/:etab", cors(corsOptions), function(req, res){
	let data_etab = req.params.etab;
	let univs = [];
        let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement&q=&rows=100&sort=-rentree&refine.rentree_lib=2018-19&refine.etablissement="+data_etab ;

	fetch(url)
	.then(res => res.json())
	.then(json =>{
		let univ = {};

		json.records.forEach(function(record){
			univ.id = record.fields.etablissement;
			univ.commune = record.fields.com_etab_lib;
			univ.region = record.fields.reg_etab_lib;
			univ.wiki = record.fields.element_wikidata;
			univ.departement = record.fields.dep_etab_lib;
			univ.nometablissement = record.fields.etablissement_lib;
			univ.typeetablissement = record.fields.etablissement_type_lib;
			univ.effectif = record.fields.effectif;

			univs.push(univ);
		})
		console.log(univs.length);
		console.log(univs[0]);

            res.format({
                'application/json': function () {
                    res.setHeader('Content-disposition', 'attachment; filename=etab.json'); //do nothing
                    res.set('Content-Type', 'application/json');
                    res.json(univs); // Modif json en univs
                },
			})
        });
    })	
	
    app.listen(port, function () {

        console.log('Serveur listening on port ' + port);
    });
}

initialize();
