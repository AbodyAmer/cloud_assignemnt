const config = require('../config/dataConfiguration')
const sql = require('mssql')

const Shipment = () => {
    return{
        getByCustomerEmail : (email) => sql.connect(config).then(pool => 
        pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM shipments WHERE customer_email = @email')
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
        }

          
    }
}

module.exports = Shipment