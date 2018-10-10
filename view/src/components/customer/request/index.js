import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import ErrorMessage from '../message/message'
import PrimaryMessage from '../message/primaryMessage'
class ShipmentRequest extends Component{

    constructor(props){
     super(props)
     this.state = {
        departure:'A',
        arrival: 'A',
        cost : 0,
        notNun: false,
        weightModified: false,
        weight: '',
        error: false, 
        message: '', 
        successMessage: false, 
        disabled: false

     }
     this.sendRequest = this.sendRequest.bind(this)
     this.close = this.close.bind(this)
     this.closee = this.closee.bind(this)
    }

    componentDidUpdate(){
        if(this.state.weightModified){
            this.setState({weightModified:false, cost: this.state.weight * 12})
        }
         if(this.state.notNun && this.state.cost !== 0){
            this.setState({cost: 0})
        }
       
    }
    closee(){
        this.setState({successMessage: false})
    }

    close(){
       this.setState({error: false})
    }

    sendRequest(e){
        e.preventDefault()
        if(this.state.arrival === this.state.departure){
            this.setState({error: true, message: 'Arrival and departure ports should be different'})
        }
        else if(this.state.weight === '' || isNaN(this.state.weight) || this.state.cost === 0){
            this.setState({error: true, message: 'Enter shipment weight'})
        } 
        else {
            this.setState({disabled: true})
            axios.post('/api/getRequest' , {
                cost: this.state.cost, 
                email: this.props.reduxState.User.email, 
                arrivalPort: this.state.arrival, 
                departurePort: this.state.departure, 
                id: this.props.reduxState.User.id
            })
            .then(res => this.setState({successMessage: true, message: 'Request completed successfuly', disabled: false}))
            .catch(e => this.setState({disabled: true}))
        }
        
    }
    render(){
        
        return(
            this.props.reduxState.User.email === undefined?
            <h1>Unauthorised</h1>:
            <Fragment>
                    {this.state.error?
            <ErrorMessage 
            message={this.state.message}
            close={this.close}
            />:
            this.state.successMessage?
            <PrimaryMessage 
            closee={this.closee}
            message={this.state.message}
            />:
            console.log()   
            }
            <form>
              <div className="form-row">
                 <div className="col">
                 <label>Departure Port</label>
                   <select 
                   onChange={e => this.setState({departure: e.target.value})}
                   className="form-control" value={this.state.departure}>
                   <option value='A'>A</option>
                   <option value='B'>B</option>
                   <option value='H'>H</option>
                   <option value='F'>F</option>
                   <option value='X'>X</option>
                   <option value='Z'>Z</option>
                   </select>
                 </div>
                 
              </div>
              <div className='form-row'>
              <div className="col">
                 <label>Arrival Port</label>
                 <select 
                   onChange={e => this.setState({arrival: e.target.value})}
                   className="form-control" value={this.state.arrival}>
                   <option value='A'>A</option>
                   <option value='B'>B</option>
                   <option value='H'>H</option>
                   <option value='F'>F</option>
                   <option value='X'>X</option>
                   <option value='Z'>Z</option>
                   </select>
                   </div>
              </div>
              <div className='form-row'>
              <div className='col'>
              <label>Shipment Weight</label>
                <input 
                onChange={e => {
                    const a = isNaN(e.target.value)
                   
                    if(!a){
                         this.setState({notNun:false , weightModified: true, weight: e.target.value})
                    }
                    else {
                     this.setState({notNun: true})
                    }
                }}
                type='text' className='form-control'/>
                {this.state.notNun?
               <div id="emailHelp" className="form-text text-muted" style={{'color': 'red'}}>Enter only number</div>:
             console.log()    
            }
              </div>
              
              </div>
              <div className='form-row'>
              <div className='col'>
              <label>Shipment Description</label>
                <textarea  className='form-control'/>
              </div>
              </div>
              <div className='form-row'>
              <div className='col'>
              <label>Cost Calclation</label>
                <input  className='form-control' readOnly value={this.state.cost + ' RM'}/>
              </div>
              </div>
              <button 
              disabled={this.state.disabled}
              className='btn btn-primary' style={{marginTop: '10px'}}
              onClick={e => this.sendRequest(e)}
              >Submit Request</button>
            </form>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return{
        reduxState: state
    }
}

export default connect(mapStateToProps)(ShipmentRequest)