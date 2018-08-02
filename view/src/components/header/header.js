import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {logOut} from '../../action/shared'

class Header extends Component{

    logout(){
       axios.get('/api/logout')
       .then(res => {
           this.props.logOut()
           localStorage.clear()
       })
       .catch(e => console.log(e))
    }

    render(){
        
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <i className="fab fa-node" style={{fontSize: '40px', color: 'white'}}></i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {this.props.reduxState.User.name === undefined?
              console.log():
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Pricing</a>
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

export default connect(mapStateToProps ,{logOut})(Header)