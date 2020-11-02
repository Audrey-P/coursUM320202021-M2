'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000 ;

app.get("/", function(req, res){
    res.send("helloW!");
})

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
