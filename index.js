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
// app.get("/data/univs", cors(corsOptions), function(req, res){
    // let univs = []; //creation tableau vide
    // let url1 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&facet=rentree_lib&facet=etablissement_type2&facet=etablissement_type_lib&facet=etablissement_lib&facet=identifiant_eter&facet=champ_statistique&facet=operateur_lib&facet=localisation_etab&facet=localisation_ins&facet=bac_lib&facet=attrac_intern_lib&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_lib&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=reg_etab_lib&facet=com_ins_lib&facet=uucr_ins_lib&facet=dep_ins_lib&facet=aca_ins_lib&facet=reg_ins_lib" ;
    // fetch(url1)
    // .then(res => res.json())
    // .then(json => {
        // console.log("fetch", json);

    // let records = json.records; // on reccupere records car c est le tableau qui nous interesse 
    // records.forEach(function(record){
        // let univ = {}; //objet vide
        // univ.id = record.etablissement; // a completer - correspondance entre donnees fetch et nom colonnes dans tableau
		// univ.rentree = record.rentree;
		// univ.academie = record.aca_etab_lib;
		// univ.commune = record.com_etab_lib;
		// univ.region = record.reg_etab_lib;
		// univ.wiki = record.element_wikidata;
		// univ.departement = record.dep_etab_lib;
		// univ.nomEtablissement = record.etablissement_lib;
		// univ.typeEtablissement = record.etablissement_type_lib;
		// univ.type2 = record.etablissement_type2;
		// univ.uucr = record.uucr_etab_lib;
		
		// univ.effectif = 0;
		
		// record.etablissement.forEach(function(eff){
			// univ.effectif += eff.effectif_total;
		// });
		// console.log(univ.effectif);

        // let url2 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&sort=tri&facet=session&facet=contrat_etab&facet=cod_uai&facet=g_ea_lib_vx&facet=dep_lib&facet=region_etab_aff&facet=acad_mies&facet=fili&facet=form_lib_voe_acc&facet=regr_forma&facet=fil_lib_voe_acc&facet=detail_forma&facet=tri&timezone=Europe%2FBerlin";
		
		
        // fetch(url2)
        // .then(res => res.json())
        // .then(json => {
            // console.log("fetch", json);

            // records.forEach(function(record2){
            // if (univ.id == record2.cod_uai){
                // console.log("URL2");
            // };
            // });
        // records.push(univ)
        // });
    // });
    // res.send(records) //renvoie la collection d'universites
// });

app.get("/index.html", cors(corsOptions), function(req, res){
    let univs = []; //creation tableau vide
    let url1 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&rows=10000&refine.rentree_lib=2018-19" ;
	//"https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public&q=&rows=405272&refine.rentree_lib=2018-19"
	let url2 = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=10000";
	
	Promise.all([
		fetch(url1),
		fetch(url2)
	]).then(function (responses) {
		// Get a JSON object from each of the responses
		return Promise.all(responses.map(function (response) {
			return response.json();
		}));
	}).then(function(json){
		//console.log(json[0]);
		let univs = [];
		let records1 = json[0].records;
		//nhits = 405 272
		let records2 = json[1].records;
		//nhits = 11 577
		
		//console.log(json[0]);
		
		let nomEtab = [];
		let univ = {};
		records1.forEach(function(record){
			 //objet vide
			
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
			univ.eff = 0;
			
			
			
			
			var data_filter = records1.filter( element => element.fields.etablissement == univ.id);
			data_filter.forEach(function(elt){
				//console.log(elt.fields.effectif_total, elt.fields.etablissement);
				univ.eff += elt.fields.effectif_total;
			});
			
			
			//console.log('eff total', univ.eff);
			
			
			records2.forEach(function(record2){
				if (univ.id == record2.cod_uai){
					var filters = records2.filter( element => element.fields.cod_uai == univ.id);
					filters.forEach(function(elt){
						//console.log("url2");
						//console.log(elt.fields.effectif_total, elt.fields.etablissement);
						univ.capacEtab += elt.fields.capa_fin;
						univ.effCandidat += elt.fields.voe_tot;
						univ.effCandPPrincipale += elt.fields.nb_voe_pp;
						univ.effCandPSecond += elt.fields.nb_voe_pc;
						univ.effCandAccPorpos += elt.fields.acc_tot;
						univ.effCandAdmisPrinc += elt.fields.acc_pp;
						univ.effCandPAdmisSecond += elt.fields.acc_pc;
					});
				}
				else{
					return;
				};
            });
			
			//console.log('nometab1', nomEtab);
			if(nomEtab.includes(univ.id)){
				//console.log("return");
				return;
			}else{
				nomEtab.push(univ.id);
				univs.push(univ);
			}
			//s'arrete à seulement 10 records ... 
			console.log('nometab2',nomEtab);
			
			//console.log("Objet créé"); //Ok va jusque la si l'établissement = pas déjà dans la liste
			
		});
		//console.log(univs);
	})
	res.send(univs); // retourne une array vide alors qu'il devrait y avoir au moins une valeur
});

//A fetch to get only serieL
app.get("/data/serieL", cors(corsOptions), function(req, res){
    let url = "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-sise-effectifs-d-etudiants-inscrits-esr-public" ;
    fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log("fetch", json);
		res.send("Data fetched, Serie L");
        // res.format({
            // 'text/html': function () {
            // res.send("Data fetched, Serie L");
            // },
            // 'application/json': function () {
                // res.setHeader('Content-disposition', 'attachment; filename=score.json'); //do nothing
                // res.set('Content-Type', 'application/json');
                // res.json(json);
            // }
		// });
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
