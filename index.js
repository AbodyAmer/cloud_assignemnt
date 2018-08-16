var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var secret = require('./session')
var app = express()

const sess = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}

if(app.get('env') === 'production'){
    app.set('trust proxy' , 1)
    sess.cookie.secure = true 
}
app.use(bodyParser.json())

app.use(session(sess))
app.get('/' , (req, res) => {
   
    
    res.sendFile(path.join(__dirname , 'view/build/index.html'))
})

require('./controller')(app)

var port = process.env.PORT || 1337;
app.listen(port);

console.log("Server running at http://localhost:%d", port);

