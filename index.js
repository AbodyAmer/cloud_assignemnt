// var http = require('http');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello Azure Cloud!");

// });
var express = require('express')
var path = require('path')
var app = express()
 //app.use(express.static( __dirname, 'build'))

app.get('/' , (req, res) => {
   
    
    res.sendFile(path.join(__dirname , 'view/build/index.html'))
})
app.get('/api/getMessage' , (req, res) => {
   
    res.json({"name": "abody"})
})


app.get('/api/getAnotherMessage' , (req, res) => {
   
    res.json({"name": "another route"})
})

var port = process.env.PORT || 1337;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
