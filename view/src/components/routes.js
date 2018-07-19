import React, {Component} from 'react'
import {BrowserRouter as Router, 
Switch,
Route
} from 'react-router-dom'
import App from './app'
import Another from './another' 

class AllRoutes extends Component{

    render(){
        return(
          <Router>
              <Switch>
                  <Route exact path='/' component={App} />
                  <Route exact path='/another' component={Another} />
              </Switch>
          </Router>
        )
    }
}

export default AllRoutes