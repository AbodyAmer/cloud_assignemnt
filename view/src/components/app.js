import React, {Component, Fragment} from 'react'
import {
    Route, 
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import Login from './login/login'
import Header from './header/header'
import AdminHome from './admin/adminHome'
import CustomerHome from './customer/customerHome'
import Register from './customer/register/register'
import ShipmentRequest  from './customer/request'
import UpdateRequest from './admin/updateShipment/updateShipment'
import RequestShipping from './admin/updateShipment/requestShipping'
// import RequestShipping from './admin/updateShipment/arrivedShipment'
class App extends Component{
    render(){
        return(     

            <Router>
                <div>
                  <Header />
                  <div className='container' style={{marginTop: '30px'}}>
                  <Switch>
                      <Route exact path='/' component={Login} />
                      <Route exact path='/adminhome' component={AdminHome} />
                      <Route exact path='/customerhome' component={CustomerHome} />
                      <Route exact path='/register' component={Register} />
                      <Route exact path='/request' component={ShipmentRequest} />
                      <Route exact path='/updaterequest' component={UpdateRequest} />
                      <Route exact path='/requestShipping' component={RequestShipping} />
                      {/* <Route exact path='/arriveShipping' component={RequestShipping} /> */}
                      <Route render={() => 
                        <h1>404 Page Not Found</h1>  
                    } />
                  </Switch>
                  </div>
                </div>
            </Router>
            
        )
    }
}

export default App