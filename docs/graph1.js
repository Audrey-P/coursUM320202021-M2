function draw(){

	//console.log(univs)

	var svg= d3.select("#svg");
	var gContainer= svg.append("g");
	var borderSVG= svg.append("rect");
	borderSVG.attr("fill","none");
	//borderSVG.attr("width",600);
	//borderSVG.attr("height",550);
	//borderSVG.attr("stroke","gray");
	
	var val = [200, 500,200,300]
	var etab = ["Etablissement A", "Etablissement B","Etablissement C","Etablissement D"]

	//Création de l'axe Y
	var scaleY = d3.scaleBand();
	// var A = univs.map(function(d) { return d.univ.nometablissement}); // On récupère les noms des etablissements dans une variable A
	scaleY.domain(etab); // A normalement
	scaleY.range([0,350]); 
	scaleY.padding(.1);

	var axisY = d3.axisLeft(scaleY);
	var gAxisY = gContainer.append("g");
	gAxisY.call(axisY);
	gAxisY.attr("transform", "translate(100,25)");
	
	
	//Création de l'axe X
	
	var scaleX = d3.scaleLinear();
	scaleX.domain([0,d3.max(val)]); //à changer en [0,d3.max(univs, function(d) { return univ.eff; })]
	scaleX.range([0,350]);
		
	var axisX = d3.axisBottom(scaleX);
	var gAxisX = gContainer.append("g");
	gAxisX.call(axisX);
	gAxisX.attr("transform", "translate(100,375)");		
	
	/*
	  // sort data
	  univs.sort(function(b, a) {
		return a.univ.eff - b.univ.eff;
	  });

	//Bars
	  svg.selectAll("myRect")
	  .data(univs)
	  .enter()
	  .append("rect")
	  .attr("x", x(0) )
	.attr("y", function(d) { return y(d.univ.nometablissement); })
	  .attr("width", function(d) { return x(d.univ.eff); })
	  .attr("height", y.bandwidth() )
	.attr("fill", "#69b3a2")
	 */

	// Add X axis label:
	svg.append("text")
	.attr("text-anchor", "end")
	.attr("x", 460)
	.attr("y", 415)
	.text("Nb demande / Nb effectif");

	// Add X axis label:
	svg.append("text")
	.attr("text-anchor", "end")
	.attr("x", 100)
	.attr("y", 15)
	.text("Etablissement");

};