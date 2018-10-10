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
       
        login: async (emailed) => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .input('email' , sql.VarChar, emailed)
                .query('SELECT * FROM customers WHERE customer_email = @email')
                return res
            
            }
            catch(e){
                console.log(e)

            }
            finally{
                pool.close()
            }
        }
      ,
        register: () =>  sql.connect(config).then(pool => 
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
         .catch(e => console.log(e))
        ), 
        requestShipment: async (shipment_date, shiptment_cost, customer_email) => {
         const pool =  new sql.ConnectionPool(config)
         try{
          await pool.connect()
          let res = await pool.request()
          .input('shipment_date' , sql.Date, shipment_date)
          .input('shiptment_cost' , sql.Decimal, shiptment_cost)
          .input('customer_email' , sql.Int, customer_email)
          .query('INSERT INTO shipments(shipment_date, shipment_cost, customer_id, shiptment_status)'+
        'VALUES(@shipment_date,@shiptment_cost, @customer_email, \'PENDING\' )')
        return res   
    }
         catch(e){
             console.log(e)
          return e
         }
         finally{
             pool.close()
         }
        }, 


       

    }
}

module.exports = Customer