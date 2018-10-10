import React from 'react'
import moment from 'moment'
const Shipments = props => 
<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Arrival Port</th>
      <th scope="col">Departure Port</th>
      <th scope="col">Request Date</th>
      <th scope="col">Arriving Date</th>
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
    <td>{moment(ship.shipment_date).format('dddd Do of MMMM YYYY').toString()}</td>
    <td>{ 
      console.log(ship)||
      ship.shippingdate !== null?
      moment(ship.shippingdate).format('dddd Do of MMMM YYYY').toString():
      'Pending for approval'
      }</td>
    <td>{ship.shipment_cost} RM</td>
    {ship.shiptment_status === 'PENDING'?
    <td style={{color: 'blue'}}>{ship.shiptment_status}</td>:
    ship.shiptment_status === 'APPROVED'?
    <td style={{color: 'yellow'}}>{ship.shiptment_status}</td>:
    ship.shiptment_status === 'SHIPPING'?
    <td style={{color: 'blue'}}>{ship.shiptment_status}</td>:
    ship.shiptment_status === 'REJECTED'?
    <td style={{color: 'red'}}>{ship.shiptment_status}</td>:
    <td style={{color: 'green'}}>{ship.shiptment_status}</td>
    }
  </tr>
    )}
    
  </tbody>
</table>

export default Shipments