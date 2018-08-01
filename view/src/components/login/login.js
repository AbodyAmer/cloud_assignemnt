import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {signIn} from '../../action/shared'
import CustomerHome from '../customer/customerHome'
import AdminHome from '../admin/adminHome'

class Login extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            message: '',
            error: ''
        }
    }
    
    

    handleLogin(e){
        e.preventDefault()
        axios.post('/api/login', {
            email: this.state.email, 
            pass: this.state.password
        })
        .then(res => {
            this.props.signIn(res.data)
        })
        .catch(e => console.log(e))
    }
    


    render(){
        console.log(this.props)
        
        return(
            this.props.reduxState.User.role === 'customer'?
            <CustomerHome />:
            this.props.reduxState.User.role === 'staff'?
            <AdminHome />:
          <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={e => this.setState({email: e.target.value})}
                />
   
              </div>
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                onChange={e => this.setState({password: e.target.value})}
                />
              </div>
              <div className='form-group'>
            <button type="submit" className="btn btn-primary"
            onClick={e => this.handleLogin(e)}
            >Submit</button>
            </div>
             <a href='#'>Register as a new customer</a>
          </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        reduxState: state
    }
}

export default connect(mapStateToProps, {signIn})(Login)