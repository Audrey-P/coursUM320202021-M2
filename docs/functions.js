function regionInfo(){
	var sent_region = document.getElementById('inRegion').value;
	console.log(sent_region);
	
	let url="/fetch/"+sent_region;
	console.log(url);
	fetch(url)
	.then(res => res.json())
	.then(json => document.getElementById("divJson").textContent = JSON.stringify(json))
	
	
}
