const Customer = require('../../model/customer/customer')
const Admin = require('../../model/admin/admin')

module.exports = (app) => {

    app.post('/api/login' , async (req, res) =>{

        
        try{
            const user = {}
            const customer = Customer()
            const admin = Admin()
            let customeruser = await customer.login(req.body.email, req.body.pass)
            if(customeruser.recordset.length === 0){
             let adminUser = await admin.login(req.body.email, req.body.pass)
             if(adminUser.recordset.length === 0){
                 res.status(400).send('User not found')
             }
             else { 
                user.name = adminUser.recordset[0].staff_name
                user.email = adminUser.recordset[0].staff_email
                user.port = adminUser.recordset[0].port_id
                user.role = 'staff'
                req.session.user = user
                res.json(user)
             }
            }
            else {
                user.name = customeruser.recordset[0].customer_name
                user.email = customeruser.recordset[0].customer_email
                user.role = 'customer'
                req.session.user = user
                res.json(user)
            }

        }
        catch(e)
        {
            res.status(400).send('User not found')
        }
    })

    
}