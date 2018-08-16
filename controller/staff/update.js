const Shipment = require('../../model/shipments')
module.exports = app => {

    app.put('/api/updateShipment' , async(req, res) => {
        if(req.session.user === undefined){
            return res.status(401).send()
        }

        console.log('req.session.user ' , req.session.user)
        try{
            
            const shipment = Shipment()
            const update = await shipment.updateShipmentL(req.body.id, req.session.user.id)
            res.json(update)
        }
        catch(e){
            console.log(e)
            res.status(400).send()
        }
    })
    app.put('/api/updateShipmentReject' , async(req, res) => {
        if(req.session.user === undefined){
            return res.status(401).send()
        }

        try{
            const shipment = Shipment()
            const update = await shipment.updateShipmentReject(req.body.id,  req.session.user.id)
            res.json(update)
        }
        catch(e){
            res.status(400).send()
        }
    })

    app.put('/api/requestShipping' , async (req, res) => {
        if(req.session.user === undefined){
            return res.status(401).send()
        }

        try{
            
            const shipment = Shipment()
            const respond = await shipment.requestShipping(req.body.id)
            res.send('ok')
        }
        catch(e){
            res.status(400).send()
        }
    })
    app.put('/api/arrived' , async (req, res) => {
        if(req.session.user === undefined){
            return res.status(401).send()
        }

        try{
            
            const shipment = Shipment()
            const respond = await shipment.arriveShipment(req.body.id)
            res.send('ok')
        }
        catch(e){
            res.status(400).send()
        }
    })
}