var dataSet = [
	{
		"nom" : "Quentin Tarantino",
		"realise" : "12",
		"joue" : "22",
		"nationalite" : "USA",
		"naissance" : "27 Mars 1963",
		"film" : "Pulp fiction"
	},
	{
		"nom" : "Jean-Pierre Jeunet",
		"realise" : "7",
		"joue" : "3",
		"nationalite" : "France",
		"naissance" : "3 Septembre 1953",
		"film" : "Le fabuleux destin d'Amélie Poulain"
	},
	{
		"nom" : "Jean Renoir",
		"realise" : "39",
		"joue" : "7",
		"nationalite" : "France",
		"naissance" : "15 Septembre 1894",
		"film" : "La grande illusion"
	},
	{
		"nom" : "Federico Fellini",
		"realise" : "21",
		"joue" : "0",
		"nationalite" : "Italie",
		"naissance" : "20 janvier 1920",
		"film" : "La dolce vita"
	},
	{
		"nom" : "Stanley Kubrick",
		"realise" : "13",
		"joue" : "0",
		"nationalite" : "USA",
		"naissance" : "26 Juillet 1928",
		"film" : "Orange mécanique"
	},
];
 
$(document).ready(function() {
    $('#example').DataTable( {
        data: dataSet,
        columns: [
            { title: "Name",data: ".nom" },
            { title: "Office",data: ".nom" },
            { title: "Extn.",data: ".nom" },
            { title: "Start date",data: ".nom" },
            { title: "Salary",data: ".nom" }
        ]
    } );
} );