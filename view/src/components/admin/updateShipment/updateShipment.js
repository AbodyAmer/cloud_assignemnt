import React,{Component} from 'react'
import moment from 'moment'
import axios from 'axios'
class UpdateRequest extends Component{

     constructor(props){
         super(props)
         this.state = {
             message: '',
             show: false,
             disable: false
         }
         this.reject = this.reject.bind(this)
         this.approve = this.approve.bind(this)
     }

          reject(e){
              e.preventDefault()
              this.setState({disable: true})
              axios.put('/api/updateShipmentReject', {id: this.props.history.location.state.shipment.shipment_id})
              .then(res => console.log(res) ||this.setState({show:true, message: "Shipment Rejected!"}))
              .catch(e => console.log(e))
          }
          approve(e){
            e.preventDefault()
            this.setState({disable: true})
            axios.put('/api/updateShipment', {id: this.props.history.location.state.shipment.shipment_id})
            .then(res => this.setState({show:true, message: "Shipment Approved!"}))
            .catch(e => console.log(e))
        }
    render(){
         return(
          <div>
              {this.state.show? 
            <div className="alert alert-secondary" role="alert">
            {this.state.message}
          </div>:
          console.log()  
            }
              <form>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Shipment ID: </label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.history.location.state.shipment.shipment_id}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Customer Email: </label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.history.location.state.shipment.customer_email}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Request Date: </label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={moment(this.props.history.location.state.shipment.shipment_date).format('dddd MMMM YYYY').toString()}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Cost: </label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.history.location.state.shipment.shiptment_cost +' RM'}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Status: </label>
    <div className="col-sm-10">
      <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={this.props.history.location.state.shipment.shiptment_status}/>
    </div>
  </div>
  <button 
  onClick={e => this.approve(e)} disabled={this.state.disable}
  className='btn btn-primary' style={{marginRight: '10px'}}>Approve</button>
  <button 
  onClick={e => this.reject(e)} disabled={this.state.disable}
  className='btn btn-danger'>Reject</button>
</form>
          </div>
         )
    }
}

export default UpdateRequest