import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
const ArrivalShipments = props => 

<div className='table-responsive'>
<table className='table table-bordered' style={{textAlign: 'center'}}>
  <thead>
      <tr>
          <th scope="col">Shipment ID</th>
          <th scope="col">Customer Email</th>
          <th scope="col">Request Date</th>
          <th scope="col">Cost</th>
          <th scope="col">Status</th>
          <th scope="col">Shipping Date</th>
          <th scope="col">Process Approval/Shipment</th>
      </tr>
  </thead>
  <tbody>
      {props.arrive.map(deps => {
          if(deps !== null){
              return deps.map(dep => {
              return(
                  <tr key={dep.shipment_id}>
                     <th scope="row">{dep.shipment_id}</th>
                     <td>{dep.customer_email}</td>
                     <td>{moment(dep.shipment_date).format('dddd MMMM YYYY').toString()}</td>
                     <td>{dep.shiptment_cost} RM</td>
                     <td>{dep.shiptment_status}</td>
                     <td>{dep.shippingdate === null?
                     'PENDING':
                     moment(dep.shippingdate).format('dddd MMMM YYYY').toString()
                    }</td>
                    <td>
                     {
                     dep.shiptment_status === 'SHIPPING'?

                     <Link to={{
                        pathname: '/updaterequest', 
                        state: {
                            shipment:dep
                        }
                    }}>Process Request</Link>:
                    dep.shiptment_status === 'APPROVED'?
                    <Link to={{
                        pathname: '/requestShipping', 
                        state: {
                            shipment:dep
                        }
                    }}>Confirm Arriving</Link>:
                      console.log()
                     }</td>
                  </tr>
                  
              )})
          }
      })}
  </tbody>
</table>
</div>

export default ArrivalShipments