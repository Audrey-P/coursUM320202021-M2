async function graph1 (){
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region);
	var univs = await response.json();
	console.log("Async function univs :",univs[0]);
	//return univs

	$(document).ready(function() {
		$('#table').DataTable( {
			paging: false,
			data: univs,
			language: {url: "French.json"},
			columns: [
				{ title: "Etablissement",data: ".nometablissement" },
				{ title: "Type",data: ".typeetablissement" },
				{ title: "Commune",data: ".commune" },
				{ title: "Capacité d'accueil",data: ".capacEtab" },
				{ title: "Effectifs inscrits",data: ".effectif" },
				{ title: "Effectifs admis",data: ".effCandAccPorpos" },
				{ title: "Informations complémentaires",data: ".wiki" }
			]
		} );
	} );

	$(document).ready(function() {
		$('#table').DataTable( {
			destroy: true,
			searching: false,
			data: univs,
			language: {url: "French.json"},
			columns: [
				{ title: "Etablissement",data: ".nometablissement" },
				{ title: "Type",data: ".typeetablissement" },
				{ title: "Commune",data: ".commune" },
				{ title: "Capacité d'accueil",data: ".capacEtab" },
				{ title: "Effectifs inscrits",data: ".effectif" },
				{ title: "Effectifs admis",data: ".effCandAccPorpos" },
				{ title: "Informations complémentaires",data: ".wiki" }
			]
		} );
	} );


};


