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
        login: (emailed) => sql.connect(config).then(pool => 
           pool.request()
        .input('email' , sql.VarChar, emailed)
        .query('SELECT * FROM customers WHERE customer_email = @email')
        .then(res => {
            sql.close()
            return res
        })
        ), 
        register: () => sql.connect(config).then(pool => 
        pool.request()
        .input('email' , sql.VarChar, email)
        .input('name' , sql.VarChar , name)
        .input('pass' , sql.VarChar, password)
        .query('INSERT INTO customers(customer_email , customer_password, customer_name) ' + 
               'VALUES(@email, @pass, @name)')
         .then(res => {
             sql.close()
             return res
         })
        ), 

       

    }
}

module.exports = Customer