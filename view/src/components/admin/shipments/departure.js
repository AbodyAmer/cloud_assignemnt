import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
const DepartureShipments = props => 

<div className='table-responsive'>
<table className='table table-bordered' style={{textAlign: 'center'}}>
  <thead>
      <tr>
          <th scope="col">Shipment ID</th>
          <th scope="col">Customer ID</th>
          <th scope="col">Request Date</th>
          <th scope="col">Cost</th>
          <th scope="col">Status</th>
          <th scope="col">Shipping Date</th>
          <th scope="col">Process Approval/Shipment</th>
      </tr>
  </thead>
  <tbody>
      {props.departue.map(deps => {
          if(deps !== null){
              return deps.map(dep => {
              return(
                  <tr key={dep.shipment_id}>
                     <th scope="row">{dep.shipment_id}</th>
                     <td>{dep.customer_id}</td>
                     <td>{moment(dep.shipment_date).format('dddd Do of MMMM YYYY').toString()}</td>
                     <td>{dep.shipment_cost} RM</td>
                     <td>{dep.shiptment_status}</td>
                     <td>{dep.shiptment_status === 'PENDING' || dep.shiptment_status === 'APPROVED'?
                     'PENDING':
                     dep.shiptment_status === 'REJECTED'?
                     'REJECTED':
                     dep.shiptment_status === 'ARRIVED'?
                     'ARRIVED':
                     moment(dep.shippingdate).format('dddd Do of MMMM YYYY').toString()
                    }</td>
                     <td>
                         {dep.shiptment_status === 'PENDING'? 
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
                        }}>Request Shipping</Link>:
                         <p>Compeleted Successfully</p>
                        }
                     </td>
                  </tr>
                  
              )})
          }
      })}
  </tbody>
</table>
</div>

export default DepartureShipments