async function graph1 (){
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region);
	var univs = await response.json();
	console.log("Async function univs :",univs[0]);
	//return univs


	function draw(){

		//select ten first data
		if (univs.length>10){
			univs = [];
			for(let i = 0; i < 11; i++){
				univs.push(univs[i])
			}
		}

		var svg= d3.select("#svg");
		var gContainer= svg.append("g");
		var borderSVG= svg.append("rect");
		borderSVG.attr("fill","none");

		var val = [200, 500,200,300]
		var etab = ["Etablissement A", "Etablissement B","Etablissement C","Etablissement D"]

		//Création de l'axe Y
		var scaleY = d3.scaleBand();
		var A = univs.map(function(d) { return d.nometablissement.substring(0, 30)}); // On récupère les noms des etablissements dans une variable A
		console.log('Labels etablissements',A)
		scaleY.domain(A); // A normalement
		scaleY.range([0,350]); 
		scaleY.padding(.1);

		var axisY = d3.axisLeft(scaleY);
		var gAxisY = gContainer.append("g");
		gAxisY.call(axisY);
		gAxisY.attr("transform", "translate(150,25)");


		//Création de l'axe X
		
		var scaleX = d3.scaleLinear();
		scaleX.domain([0,d3.max(univs, function(d) { return d.effectif; })]); 
		scaleX.range([0,300]);
			
		var axisX = d3.axisBottom(scaleX);
		var gAxisX = gContainer.append("g");
		gAxisX.call(axisX);
		gAxisX.attr("transform", "translate(150,375)");		


		// sort data
		univs.sort(function(b, a) {
			return a.effectif - b.effectif;
		});

		//for(i in range(0:2)){}

		//Bars
		svg.selectAll("myRect")
		.data(univs)
		.enter()
		.append("rect")
		.attr("x", scaleX(0) )
		.attr("y", function(d) { return scaleY(d.nometablissement); })
		.attr("width", function(d) { return scaleX(d.effectif); })
		.attr("height", scaleY.bandwidth() )
		.attr("fill", "#182b6f")
		.attr("transform", "translate(150,50)");	
		

		// Add X axis label:
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 460)
		.attr("y", 415)
		.text("Nb candidats / Effectif");

		// Add Y axis label:
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 100)
		.attr("y", 15)
		.text("Etablissement");
	}; 
	draw()
};
