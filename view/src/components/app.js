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

class App extends Component{
    render(){
        return(     

            <Router>
                <div>
                  <Header />
                  <div className='container'>
                  <Switch>
                      <Route exact path='/' component={Login} />
                      <Route exact path='/adminhome' component={AdminHome} />
                      <Route exact path='/customerhome' component={CustomerHome} />
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