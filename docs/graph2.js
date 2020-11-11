function draw2(){
			//d3.json("exo2.json").then(function(data) {
				var svg= d3.select("#svg1");
				var gContainer= svg.append("g");
				var borderSVG= svg.append("rect");
				//borderSVG.attr("width",600);
				//borderSVG.attr("height",550);
				borderSVG.attr("fill","none");
				//borderSVG.attr("stroke","gray");
				
               // var A = records.map(function(d) { return d.records}); // On récupère les noms des etablissements dans une variable A
                //var B = Array.from({length: data.length}, (v, k) => k*100); // On créer le bon nombre de graduation selon la taille du jeu de données
                
                //console.log(A);
                //console.log(records);
				
                //Création de l'axe Y
				//var scaleY = d3.scaleOrdinal();
				var scaleY = d3.scaleLinear();
				scaleY.domain([1000,0]); // A normalement
                scaleY.range([0,350]); // B normalement...
				
				var axisY = d3.axisLeft(scaleY);
				var gAxisY = gContainer.append("g");
				gAxisY.call(axisY);
				gAxisY.attr("transform", "translate(50,25)");
				
				
				
				
				console.log(document.getElementById('univ').required = false);
				console.log(document.getElementById('univ').parentNode.style.display = "none");
				
				
				
				
				//Création de l'axe X
				
				var scaleX = d3.scaleLinear();
				//scaleX.domain([0,document.getElementById('univ')]); //à changer
				//console.log(scaleX.domain([0,univ.wiki]));
				scaleX.range([0,400]);//à changer
					
				var axisX = d3.axisBottom(scaleX);
				var gAxisX = gContainer.append("g");
				gAxisX.call(axisX);
				gAxisX.attr("transform", "translate(50,375)");		


				// Color for dots
                //reg = []
                //for(i=1;i<data.length;i++){
                //    if (reg.includes(data[i].region) == false){
                //            reg.push(data[i].region)
                //    }
                //}

                // Add a scale for bubble size
               // var z = d3.scaleLinear()
                //    .domain([minValueNat(data,"population_en_millions"),maxValueNat(data,"population_en_millions")])
                //    .range([ 3, 10]);
                //Add a scale for dots color 
                //var color = d3.scaleOrdinal()
                //    .domain(reg)
                //    .range([ "#FF0000", "#DBA901", "#298A08","#0101DF","#FFFF00"])
                //var c10 = d3.scaleOrdinal(d3.schemeCategory10);

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

			//}
				
};