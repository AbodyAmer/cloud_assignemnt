const ShipmentPort = require('../../model/ports/shipmentPorts')
const Shipment = require('../../model/shipments')
const Admin = require('../../model/admin/admin')
module.exports = app => {
    app.get('/api/adminhome/:port' , async (req, res) => {
        

        const {port} = req.params
        const shipmentPorts = ShipmentPort()

        try{
             const portShipments = await shipmentPorts.getShipmentPortByPortId(port)
             let arrivalArr = await Promise.all(portShipments.recordset.map(ship => {
                 if(ship.type === 'arrival'){
                     return ship
                 }
             }))
             let departureArr = await Promise.all(portShipments.recordset.map(ship => {
                 if(ship.type === 'departure'){
                     return ship
                 }
             }))

             

             const shipment = Shipment()
             const arrivalShipment = await Promise.all(arrivalArr.map(async arr => {
               
                if(arr === undefined) 
                return
                else{
                    const admin = Admin()
                   
                const s = await shipment.getShipmentById(arr.shipment_id)
                
                return s.recordset}
             }))
             const departureShipment = await Promise.all(departureArr.map(async arr => {
                 
                 if(arr === undefined) 
                 return
                 else{
                const s = await shipment.getShipmentById(arr.shipment_id)
                return s.recordset}
             }))

             const obj = {
                arrivalShipment, 
                departureShipment
            }

             
            
             res.json(obj)
        }
        catch(e){
            console.log(e)
             res.status(400).send(e)
        }

        

    })
}