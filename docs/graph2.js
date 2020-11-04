function draw2(){
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
				
				
				//Création de l'axe X
				
				var scaleX = d3.scaleLinear();
				scaleX.domain([0,1000]); //à changer
				scaleX.range([0,400]);//à changer
					
				var axisX = d3.axisBottom(scaleX);
				var gAxisX = gContainer.append("g");
				gAxisX.call(axisX);
				gAxisX.attr("transform", "translate(50,375)");					
};