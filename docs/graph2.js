async function graph2 (){
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region,
	{
		headers: { //negociation de contenu
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}}
	);
	var univs = await response.json();
	console.log("Async function graph2 :",univs[0]);
	//return univs





	function draw2(){
			
				var svg= d3.select("#svg1");
				var gContainer= svg.append("g");
				var borderSVG= svg.append("rect");
				borderSVG.attr("fill","none");
				

				
                //Création de l'axe Y
				//var scaleY = d3.scaleOrdinal();
				var scaleY = d3.scaleLinear();
				scaleY.domain([d3.max(univs, function(d) { return d.effectif; }), 0]); 
				console.log(d3.max(univs, function(d) { return d.effectif; }));
                scaleY.range([0,350]); 

				
				var axisY = d3.axisLeft(scaleY);
				var gAxisY = gContainer.append("g");
				gAxisY.call(axisY);
				gAxisY.attr("transform", "translate(50,25)");
				

				
				//Création de l'axe X
				
				var scaleX = d3.scaleLinear();
				//scaleX.domain([0,300]); 
				scaleX.domain([0,d3.max(univs, function(d) { return d.capacEtab; })]); //capacité
				//console.log(d3.max(univs, function(d) { return d.capacEtab; }));
				scaleX.range([0,500]);
					
				var axisX = d3.axisBottom(scaleX);
				var gAxisX = gContainer.append("g");
				gAxisX.call(axisX);
				gAxisX.attr("transform", "translate(50,375)");		


                // Dots
                //var circle = [];
                //for(i=0;i<data.length;i++){
                //    circle[i]=gContainer.append("circle");
                 //   circle[i].data(data[i]);
                //    circle[i].attr("class", "point");
                //    circle[i].attr("cx", scaleX(data[i].natalite) );
                //    circle[i].attr("cy", scaleY(data[i].mortalite));
                 //   circle[i].attr("r", z(data[i].population_en_millions));
                 //   circle[i].attr("transform","translate(20,20)");
                 //   circle[i].style("fill", c10(data[i].region));
                //}

			
		// Add X axis label:
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 460)
		.attr("y", 412)
		.text("Capacité d'accueil des établissements");

		// Add Y axis label:
		svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 260)
		.attr("y", 15)
		.text("Effectif de la rentrée des établissements");
				
	};

	draw2()
};