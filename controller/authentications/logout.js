module.exports = app => {

    app.get('/api/logout' , (req, res) => {

        
        
        req.session.user = null
        res.send('ok')
      

    })
} 