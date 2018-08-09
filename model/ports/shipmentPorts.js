const config = require('../config/dataConfiguration')
const sql = require('mssql')

const ShipmentPort = () =>{
    return{
        getSHipmentPort: async (shipmentID) => {
            const pool = new sql.ConnectionPool(config)
            try{
            await pool.connect()
        const res = await pool.request()
        .input('shipID', sql.Int, shipmentID)
        .query('SELECT * FROM portsShipments WHERE shipment_id = @shipID')
         return res
            }catch(e){
                  return e
            }
            finally{
                pool.close()
            }
        }, 
       
        getPortById: async (id) => {
            const pool = new sql.ConnectionPool(config)
            try{
            
            await pool.connect()
            let result = await pool.request().input('id' , sql.VarChar, id).query('SELECT * FROM ports WHERE port_id = @id')
            return result
        }
            catch(e){
            return e
            }
            finally{
             pool.close()
            }
        }, 
        addnewShipmentPort: async (type, shipmentID, portID) => {
            const pool = new sql.ConnectionPool(config)
            try{
              await pool.connect()
              const res = await pool.request()
              .input('type' , sql.VarChar, type)
              .input('shipmentID' , sql.VarChar, shipmentID)
              .input('portID' , sql.VarChar, portID)
              .query('INSERT INTO portsShipments(shipment_id, port_id, type)'+
            'VALUES(@shipmentID, @portID, @type)')
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

module.exports = ShipmentPort
