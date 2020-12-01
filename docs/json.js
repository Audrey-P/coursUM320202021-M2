async function dljson (){
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region,
	{
		headers: { //negociation de contenu
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}}
	);
	var univs = await response.json();

	download(JSON.stringify(univs), "data_js.json", "text/plain");


};


function download(content, fileName, contentType) {
 const a = document.createElement("a");
 const file = new Blob([content], { type: contentType });
 a.href = URL.createObjectURL(file);
 a.download = fileName;
 a.click();
}

async function dlxml (){
	var sent_region = document.getElementById('inRegion').value;
	const response = await fetch('/univs/'+sent_region);
	var univs = await response.text();
	//return univs;

	console.log(univs);
	download(univs, "data_xml.xml", "application/xml");


};