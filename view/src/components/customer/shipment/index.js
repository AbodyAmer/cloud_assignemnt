import React from 'react'
import moment from 'moment'
const Shipments = props => 
<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Arrival Port</th>
      <th scope="col">Departure Port</th>
      <th scope="col">Date</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
      {props.shipment.map(ship => 
    <tr key={ship.shipment_id}>
    <th scope="row">{ship.shipment_id}</th>
    <td>{ship.arrival}</td>
    <td>{ship.departure}</td>
    <td>{moment(ship.shipment_date).format('dddd MMMM YYYY').toString()}</td>
    <td>{ship.shiptment_cost} RM</td>
    <td>{ship.shiptment_status}</td>
  </tr>
    )}
    
  </tbody>
</table>

export default Shipments