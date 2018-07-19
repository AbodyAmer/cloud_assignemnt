var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.get('/' , (req, res) => {
   
    
    res.sendFile(path.join(__dirname , 'view/build/index.html'))
})
app.get('/api/getMessage' , (req, res) => {
   
    res.json({"name": "Messi"})
})


app.get('/api/getAnotherMessage' , (req, res) => {
   
    res.json({"name": "another route"})
})

var port = process.env.PORT || 1337;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
