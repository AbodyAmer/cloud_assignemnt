import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Shipments from './shipment'
class CustomerHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            didMount: false,
            shipment: []
        }
    }

    componentDidMount(){
       axios.get(`/api/customerHome/${this.props.reduxState.User.id}`)
       .then(res => this.setState({didMount: true, shipment: res.data}))
       .catch(e => this.setState({didMount: true}))
    }
  
    render(){
        
        return(
            this.state.didMount?
            this.state.shipment.length === 0?
            <h1>You don't have shipment history</h1>:
            <Shipments 
            shipment={this.state.shipment}
            />:
            <h1>Loading</h1>
        )
    }
}

function mapStateToProps(state){
    return{
        reduxState: state
    }
}
export default connect(mapStateToProps) (CustomerHome)
