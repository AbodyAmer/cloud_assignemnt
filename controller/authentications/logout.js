module.exports = app => {

    app.get('/api/logout' , (req, res) => {

        
        if(req.session.user !== null){
        req.session.user = null
        res.send('ok')
        }
        else {
            res.status(401).send()
        }

    })
} 