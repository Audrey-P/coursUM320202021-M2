function regionInfo(){
	var sent_region = document.getElementById('prenom').value;
	console.log(sent_region);
	
	let url="/fetch/"+sent_region;
	console.log(url);
	fetch(url)
	.then(res => res.json())
	.then(json => document.getElementById("divJson").textContent = JSON.stringify(json))
	
	
}

// document.getElementById("btn-submit-mmform").onclick = function() {
	// console.log("je suis la");
	// let sent_region = document.getElementsById('nom').value;
		// console.log(sent_region);
		
		// let url="/fetch/"+sent_region;
		// console.log(url);
		// fetch(url)
		// .then(res => res.json())
		// .then(json => document.getElementsById("divJson").textContent = JSON.stringify(json.results))
// }