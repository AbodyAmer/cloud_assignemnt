const Shipment = require('../../model/shipments')
const ShipmentPort = require('../../model/ports/shipmentPorts')
const _ = require('lodash')
module.exports = app => {

    app.get('/api/customerHome/:email', async (req, res) => {

        
      
        const shipment = Shipment()
        try{
        let shipments = await shipment.getByCustomerEmail(req.params.email)
        if(shipments.recordset.length === 0){
            
          return res.status(404).send()
        }
        else {
            const shipmentPort = ShipmentPort()
               
               const shipmentArr = await Promise.all(shipments.recordset.map(async sh => {
                
                const obj =  _.pick(sh, ['shipment_id' , 'shipment_date' , 'shiptment_status', 'shipment_cost' , 'customer_email' , 'staff_id' , 'shippingdate'])
               
                let ship = await shipmentPort.getSHipmentPort(sh.shipment_id)
                let aa = await Promise.all(ship.recordset.map(async port => {
                  if(port.type === 'arrival'){
                     
                    let po = await shipmentPort.getPortById(port.port_id)
                    
                    obj.arrival = po.recordset[0].port_id
                  }
                  else {
                   
                        
                        let po = await shipmentPort.getPortById(port.port_id)
                        
                        obj.departure = po.recordset[0].port_id
                   
                   
                  }
                }))
               
                
          return obj
               }    
        ))
             
             
             
            res.json(shipmentArr)
        }
        }
        catch(e){
         console.log('err ' , e)
        }

    })
}