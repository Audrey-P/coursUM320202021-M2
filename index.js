'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

const fetch = require('node-fetch');
const {writeFile} = require('fs');
const fs = require('fs');
const {promisify} = require('util');
const writeFilePromise = promisify(writeFile);
var https = require('https');
var cors = require('cors');

var corsOptions = {
    origin: 'https://Audrey-P.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


//ROUTES

//fetch univ et parcoursup

//init some date fetched somewhere
//let initjson = {};
let initjson2 = {};

async function initialize()
{
	let url1 = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public/download/?format=json&disjunctive.rentree_lib=true&refine.rentree_lib=2018-19&timezone=Europe/Berlin&lang=fr" ;
	//initjson = await fetch(url1).then(response => response.json());
    //console.log("initjson", initjson);
	
	function downloadFile(url, outputPath) {
	  return fetch(url)
		  .then(x => x.arrayBuffer())
		  .then(x => writeFilePromise(outputPath, Buffer.from(x)));
	}
	//downloadFile(url1, "dataFile.json");

    console.log("now can start server");
	// let url2 = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/download/?format=json&timezone=Europe/Berlin&lang=fr;";
	// initjson2 = await fetch(url2).then(response => response.json());
    // //console.log("initjson2", initjson2);
    // console.log("now can start server (2)");
	
	//serves static files
	app.use(express.static('docs'));
	
	// app.get("/univs", cors(corsOptions), function(req, res){
	
		// let univs = []; //creation tableau vide
		// let url1 = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public/download/?format=json&disjunctive.rentree_lib=true&refine.rentree_lib=2018-19&timezone=Europe/Berlin&lang=fr" ;
		// let url2 = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/download/?format=json&timezone=Europe/Berlin&lang=fr;";
		
		// Promise.all([
			// fetch(url1),
			// fetch(url2)
		// ]).then(function (responses) {
			// // Get a JSON object from each of the responses
			// return Promise.all(responses.map(function (response) {
				// return response.json();
			// }));
		// }).then(function(json){
			// //console.log(json[0]);
			// let univs = [];
			// let records1 = json[0].records;
			// //nhits = 405 272
			// let records2 = json[1].records;
			// //nhits = 11 577
			
			// console.log(json[0]);
			
			// let nomEtab = [];
			// let univ = {};
			// records1.forEach(function(record){
				 // //objet vide
				
				// univ.id = record.fields.etablissement;
				// univ.rentree = record.fields.rentree;
				// univ.academie = record.fields.aca_etab_lib;
				// univ.commune = record.fields.com_etab_lib;
				// univ.region = record.fields.reg_etab_lib;
				// univ.wiki = record.fields.element_wikidata;
				// univ.departement = record.fields.dep_etab_lib;
				// univ.nometablissement = record.fields.etablissement_lib;
				// univ.typeetablissement = record.fields.etablissement_type_lib;
				// univ.type2 = record.fields.etablissement_type2;
				// univ.uucr = record.fields.uucr_etab_lib;
				// univ.eff = 0;
				
				
				
				
				// var data_filter = records1.filter( element => element.fields.etablissement == univ.id);
				// data_filter.forEach(function(elt){
					// //console.log(elt.fields.effectif_total, elt.fields.etablissement);
					// univ.eff += elt.fields.effectif_total;
				// });
				
				
				// //console.log('eff total', univ.eff);
				
				
				// records2.forEach(function(record2){
					// if (univ.id == record2.cod_uai){
						// var filters = records2.filter( element => element.fields.cod_uai == univ.id);
						// filters.forEach(function(elt){
							// //console.log("url2");
							// //console.log(elt.fields.effectif_total, elt.fields.etablissement);
							// univ.capacEtab += elt.fields.capa_fin;
							// univ.effCandidat += elt.fields.voe_tot;
							// univ.effCandPPrincipale += elt.fields.nb_voe_pp;
							// univ.effCandPSecond += elt.fields.nb_voe_pc;
							// univ.effCandAccPorpos += elt.fields.acc_tot;
							// univ.effCandAdmisPrinc += elt.fields.acc_pp;
							// univ.effCandPAdmisSecond += elt.fields.acc_pc;
						// });
					// }
					// else{
						// return;
					// };
				// });
				
				// //console.log('nometab1', nomEtab);
				// if(nomEtab.includes(univ.id)){
					// //console.log("return");
					// return;
				// }else{
					// nomEtab.push(univ.id);
					// univs.push(univ);
				// }
				// //s'arrete à seulement 10 records ... 
				// console.log('nometab2',nomEtab);
				
				// //console.log("Objet créé"); //Ok va jusque la si l'établissement = pas déjà dans la liste
				
			// });
			// //console.log(univs);
		// })

		
		// res.send(univs); // retourne une array vide alors qu'il devrait y avoir au moins une valeur
	// })
	
	app.get("/univs", cors(corsOptions), function(req, res){
        //var data = fs.readFileSync('dataFile.json', 'utf8');
		console.log('test');
		// fs.readFile("dataFile.json", 'utf8', (err, data) => {
			// //const databases = JSON.parse(data);
			// console.log(data);
		// });
		fs.readFileSync("dataFile.json", 'utf8');
		console.log(datas);
	})
    
	app.listen(port, function () {
		console.log('Serveur listening on port ' + port);
	});
}

initialize();
