async function graphs (){
	d3.select("#svg").html("");
	d3.select("#svg1").html("");
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region,
	{
		headers: { //negociation de contenu
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}}
	);
	var univs = await response.json();
	//console.log("Async function graph1 :",univs[0]);

	// Graphique N°1

		var univs2= univs.filter(function(univs){return univs.effCandidat!=0;}); 
		
		// Tri
		univs2.sort(function(b, a) {
			return (a.effCandidat/a.effectif) - (b.effCandidat/b.effectif);
		});

		var svg= d3.select("#svg");
		var gContainer= svg.append("g");
		var borderSVG= svg.append("rect");
		borderSVG.attr("fill","none");

		//Création de l'axe Y
		var scaleY = d3.scaleBand();
		var A = univs2.map(function(d) { return d.nometablissement}); // On récupère les noms des etablissements dans une variable A
		scaleY.domain(A); 
		scaleY.range([0,350]); 
		scaleY.padding(.1);

		var axisY = d3.axisLeft(scaleY);
		var gAxisY = gContainer.append("g");
		gAxisY.call(axisY);
		gAxisY.attr("transform", "translate(320,25)");

		//Création de l'axe X
		var scaleX = d3.scaleLinear();
		scaleX.domain([0,d3.max(univs2, function(d) { return d.effCandidat/d.effectif; })]); 
		scaleX.range([0,255]);
			
		var axisX = d3.axisBottom(scaleX);
		var gAxisX = gContainer.append("g");
		gAxisX.call(axisX);
		gAxisX.attr("transform", "translate(320,375)");		

		//Bars (https://www.d3-graph-gallery.com/graph/)
		svg.selectAll("myRect")
		.data(univs2)
		.enter()
		.append("rect")
		.attr("x", scaleX(0) )
		.attr("y", function(d) { return scaleY(d.nometablissement); })
		.attr("width", function(d) { return scaleX(d.effCandidat/d.effectif); })
		.attr("height", scaleY.bandwidth() )
		.attr("fill", "#182b6f")
		.attr("transform", "translate(320,25)");	
		
		//Label axe X
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 618)
		.attr("y", 415)
		.text("Nb candidats R2019 / Effectif R2018");

		//Label axe Y
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 100)
		.attr("y", 15)
		.text("Etablissement");


	// Graphique N°2
		
		var univs2= univs.filter(function(univs){return univs.capacEtab!=0;});

		var A = univs2.map(function(d) { return d.nometablissement}); // On récupère les noms des etablissements dans une variable A
		
		var B = univs2.map(function(d) { return d.capacEtab}); // On récupère les capacités des etablissements
		//console.log('Capacité etablissements',B);
		
		var C = univs2.map(function(d) { return d.effectif}); // On récupère les effectifs des etablissements
		//console.log('effectif etablissements',C);
		
		var D = univs2.map(function(d) { return d.effCandidat});
		//console.log('effectif des demandes',D);

		var svg= d3.select("#svg1");
		var gContainer= svg.append("g");
		var borderSVG= svg.append("rect");
		borderSVG.attr("fill","none");
						
        //Création de l'axe Y
		var scaleY = d3.scaleLinear();
		scaleY.domain([d3.max(univs2, function(d) { return d.effectif; }), 0]); 
		//console.log(d3.max(univs2, function(d) { return d.effectif; }));
        scaleY.range([0,350]); 
				
		var axisY = d3.axisLeft(scaleY);
		var gAxisY = gContainer.append("g");
		gAxisY.call(axisY);
		gAxisY.attr("transform", "translate(50,25)");			
				
		//Création de l'axe X
		var scaleX = d3.scaleLinear();
		scaleX.domain([0,d3.max(univs2, function(d) { return d.capacEtab; })]); 
		//console.log(d3.max(univs2, function(d) { return d.capacEtab; }));
		scaleX.range([0,480]);
					
		var axisX = d3.axisBottom(scaleX);
		var gAxisX = gContainer.append("g");
		gAxisX.call(axisX);
		gAxisX.attr("transform", "translate(50,375)");	
		
		var scaleZ = d3.scaleLinear();
		scaleZ.domain([0,d3.max(univs, function(d) { return d.effCandidat; })]); 
		scaleZ.range([2,8]);
		
        // Dots
        var circle = [];
        for(i=0;i<A.length;i++){
			circle[i]=gContainer.append("circle");
            circle[i].attr("class", "point");
            circle[i].attr("cx", scaleX(B[i]));
			circle[i].attr("cy", scaleY(C[i]));
			circle[i].attr("r", scaleZ(D[i]));
			circle[i].attr("id", "circle");
            circle[i].attr("transform","translate(50,27)");
			circle[i].style("fill", "dimgrey");
			circle[i].style("stroke", "white");
			circle[i].style("troke-width", 2);
			circle[i].on("mouseover", function(d){
				for(i=0;i<A.length;i++){
					//console.log(C[i]);
					d3.select(circle[i]);
					gContainer.append("text").attr("x", scaleX(B[i])-15).attr("y", scaleY(C[i])+10).text(A[i]).style("font-size", "9px").attr("alignment-baseline","middle").attr("id", "txt");
			}
			});
			circle[i].on("mouseout", function(i) {
				for(i=0;i<A.length;i++){
					d3.select("#txt").remove();
				}
			});		
		};

		//Legende 
		var borderSVG2 = svg.append("rect");
		borderSVG2.attr("width",140);
		borderSVG2.attr("height",45);
		borderSVG2.attr("fill","none");
		borderSVG2.attr("stroke","gray");
		borderSVG2.attr("transform", "translate(400,275)");
		svg.append("circle").attr("cx",410).attr("cy",301).attr("r", 5).style("fill", "dimgrey").style("stroke", "white");
		svg.append("text").attr("x", 420).attr("y", 285).text("Taille des points :").style("font-size", "11px").attr("alignment-baseline","middle").attr("text-decoration", "underline");
		svg.append("text").attr("x", 420).attr("y", 298).text("Nombre de demande").style("font-size", "13.5px").attr("alignment-baseline","middle");
		svg.append("text").attr("x", 420).attr("y", 308).text("par établissement").style("font-size", "13.5px").attr("alignment-baseline","middle");


		//Label axe X
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 550)
		.attr("y", 412)
		.text("Capacité d'accueil des établissements");

		//Label axe Y
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 260)
		.attr("y", 15)
		.text("Effectif de la rentrée des établissements");				


//Tableau détaillé
	
	$(document).ready(function() {
		$('#table').DataTable( {
			paging: false,
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
