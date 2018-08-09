
module.exports = app => {
    app.get('/api/adminhome/:email' , (req, res) => {
       
        if(req.session.user === undefined){
            return res.status(401).send()
        }
 
        

    })
}