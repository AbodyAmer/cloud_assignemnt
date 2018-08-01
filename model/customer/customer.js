const config = require('../config/dataConfiguration')
const sql = require('mssql')

const Customer = (customerName ='' , customerEmail = '' , customerPassword) => {

    const name = customerName
    const email = customerEmail
    const password = customerPassword

    return{
        getName: () => name, 
        getEmail: () => email, 
        getPass: () => password,
        login: (emailed, pass) => sql.connect(config).then(pool => 
           pool.request()
        .input('email' , sql.VarChar, emailed)
        .input('pass', sql.VarChar, pass)
        .query('SELECT * FROM customers WHERE customer_email = @email AND customer_password = @pass')
        .then(res => {
            sql.close()
            return res
        })
        )
       

    }
}

module.exports = Customer