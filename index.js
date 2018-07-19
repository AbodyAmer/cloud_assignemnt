// var http = require('http');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello Azure Cloud!");

// });
var express = require('express')
var app = express()
app.use(express.static('build'))
app.get('/api/getMessage' , (req, res) => {
   
    res.json({"name": "abody"})
})

var port = process.env.PORT || 1337;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
