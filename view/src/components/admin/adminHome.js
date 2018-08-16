import React, {Component, Fragment} from 'react'
import axios from 'axios'
import DepartureShipments from './shipments/departure'
import ArrivalShipments from './shipments/arrival'
class AdminHome extends Component {

    constructor(props){
        super(props)
        this.state = {
            departures: [],
            didMount: false, 
            arriving: []
        }
    }
    componentDidMount(){
       axios.get('/api/adminhome')
       .then(res => {console.log(res)
    this.setState({departures: res.data.departureShipment, didMount: true, arriving: res.data.arrivalShipment})
    })
       .catch(e => this.setState({didMount: true}))

    }
    render(){
        
        return(
            <div>
                {this.state.didMount?
                this.state.departures.length === 0 && this.state.arriving.length === 0?
                <h1>No Arriving or departing shipment found</h1>:
                <Fragment>
                <h1>
                    Departing Shipments
                </h1>
                <hr />
                {this.state.departures.length === 0? 
                <h1>No departing shipments found</h1>  :
                <DepartureShipments 
                departue={this.state.departures}
                
                />
            }
            <hr />
            <h1>
                    Arriving Shipments
                </h1>
                <hr />
                <ArrivalShipments 
                arrive={this.state.arriving}
                />
                </Fragment>:
                <h1>Loading!</h1>
        }
            </div>
        )
    }
}
export default AdminHome
