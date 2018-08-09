const Customer = require('../../model/customer/customer')
const moment = require('moment')
const Shipment = require('../../model/shipments')
const ShipmentPort = require('../../model/ports/shipmentPorts')
module.exports = app => {

    app.post('/api/getRequest', async (req , res) => {

        if(req.session.user === undefined){
            return res.status(401).send()
        }

        const {cost, email, arrivalPort, departurePort} = req.body
        try{
        const customer = Customer()
        const r = await customer.requestShipment(moment(new Date()).format('YYYY-MM-DD').toString(), cost, email)
        const shipment = Shipment()
        const latestSHipment = await shipment.getLatestShipment()
        const shipmentPort = ShipmentPort()
        const arrive = await shipmentPort.addnewShipmentPort('arrival', latestSHipment.recordset[0].shipment_id, arrivalPort)
        const depart = await shipmentPort.addnewShipmentPort('departure', latestSHipment.recordset[0].shipment_id, arrivalPort)
        res.send('OK')
    }
    catch(e){
        res.status(400).send()
    }
    })
}