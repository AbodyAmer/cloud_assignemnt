import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {logOut} from '../../action/shared'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component{

    logout(){
       axios.get('/api/logout')
       .then(res => {
           this.props.logOut()
           localStorage.clear()
           console.log('this.props.history' , this.props.history)
           this.props.history.push('/')
       })
       .catch(e => console.log(e))
    }

    render(){
        
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <h4>CMS</h4>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {this.props.reduxState.User.name === undefined?
              console.log():
              this.props.reduxState.User.role === 'customer'?
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/request'>New Request</Link>
                </li>
               
              </ul>
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <a 
            href="#" className="nav-link">
                Welcome {this.props.reduxState.User.name}!
            </a>
                  
                  </li>
              <li className="nav-item">
              
            <a 
            onClick={e => this.logout()}
            href="#" className="nav-link">
                Sign Out
            </a>
        </li>
 
              </ul>
            </div>:
              <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
              
              </ul>
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <a 
            href="#" className="nav-link">
                Welcome {this.props.reduxState.User.name}!
            </a>
                  
                  </li>
              <li className="nav-item">
              
            <a 
            onClick={e => this.logout()}
            href="#" className="nav-link">
                Sign Out
            </a>
        </li>
 
              </ul>
            </div>
            }
          </nav>
        )
    }
}

function mapStateToProps(state){
    return{
        reduxState: state
    }
}

export default connect(mapStateToProps ,{logOut})(withRouter(Header))