const Customer = require('../../model/customer/customer')
const bcrypt = require('bcryptjs')

module.exports = app => {

    app.post('/api/register', async(req, res) => {
        
        const {name, password, email} = req.body

       
        try{
             const salt = await bcrypt.genSalt(10)
             const hash = await bcrypt.hash(password, salt)
             const customer = Customer(name, email, hash)
           
             const cust = await customer.login(email)
             console.log(cust.recordset.length)
             if(cust.recordset.length === 0){
             const cus = await customer.register()
             console.log('cus ', cus)
             res.json(cus)
            }
             else {
                 res.send('Email Is Used')
             }
        }
        catch(e){
            console.log(e)
            res.status(400).send(e)
        }
    })
}