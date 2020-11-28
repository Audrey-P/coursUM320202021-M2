function regionInfo(){

	var sent_region = document.getElementById('inRegion').value;

	console.log(sent_region);
	
	let url="/univs/"+sent_region;
	console.log(url);
	fetch(url, 
		{
		headers: { //negociation de contenu
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}})
	.then(res => res.json())
	.then(json => document.getElementById("divJson").textContent = JSON.stringify(json))

}

