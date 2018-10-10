const config = require('../config/dataConfiguration')
const sql = require('mssql')
const moment = require('moment')



const Shipment = () => {
    return{
        getByCustomerEmail : (email) => sql.connect(config).then(pool => 
        pool.request()
        .input('email', sql.Int, email)
        .query('SELECT * FROM shipments WHERE customer_id = @email')
        .then(res => {
            sql.close()
            return res
        })
        ), 
        getLatestShipment: async () => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .query('SELECT TOP 1 * FROM shipments ORDER BY shipment_id DESC')

                return res
            }
            catch(e){
                return e
            }
            finally{
                pool.close()
            }
        }, 
        getShipmentById : async id => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .input('id' , sql.Int, id)
                .query('SELECT * FROM shipments WHERE shipment_id = @id')
                return res
            }
            catch(e){
              return e
            }
            finally{
                pool.close()
            }
        }, 
        updateShipmentL: async (id, staff) => {
          const pool = new sql.ConnectionPool(config)
          try{
              await pool.connect()
              const res = await pool.request()
              .input('id' , sql.Int, id)
              .input('staff' , sql.Int, staff)
              .query('UPDATE shipments SET shiptment_status = \'APPROVED\' , staff_id = @staff '+ 
            'WHERE shipment_id = @id')
            
            return res

          }
          catch(e){
            
              return e
          }
          finally{
              pool.close()
          }
        },
        updateShipmentReject: async (id, staff) => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .input('id' , sql.Int, id)
                .input('staff' , sql.Int, staff)
                .query('UPDATE shipments SET shiptment_status = \'REJECTED\', staff_id = @staff '+ 
              'WHERE shipment_id = @id')
              return res
  
            }
            catch(e){
                return e
            }
            finally{
                pool.close()
            }
          },
          requestShipping: async id => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .input('id' , sql.Int, id)
                .input('date' , sql.Date, moment(new Date()).add(Math.random() * 12, 'd').format('YYYY-MM-DD').toString())
                .query('UPDATE shipments SET shiptment_status = \'SHIPPING\', shippingdate = @date '+ 
              'WHERE shipment_id = @id')
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
          arriveShipment: async id => {
            const pool = new sql.ConnectionPool(config)
            try{
                await pool.connect()
                const res = await pool.request()
                .input('id' , sql.Int, id)
                .query('UPDATE shipments SET shiptment_status = \'ARRIVED\',  '+ 
              'WHERE shipment_id = @id')
              return res
  
            }
            catch(e){
                console.log(e)
                return e
            }
            finally{
                pool.close()
            }
          }
          

          
    }
}

module.exports = Shipment