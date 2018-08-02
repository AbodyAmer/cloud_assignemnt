import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {signIn} from '../../action/shared'
import CustomerHome from '../customer/customerHome'
import AdminHome from '../admin/adminHome'
import ErrorMessage from './message'
import RegisterMessage from './regsitermessage'

class Login extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            message: '',
            error: '',
            disabled: false, 
            showMessage: false,
            afterClose: false
        }
        this.close = this.close.bind(this)
        this.closeR = this.closeR.bind(this)
        
    }

    componentDidMount(){
        if(this.props.location.state !== undefined)
        {
            if(!this.state.showMessage && !this.state.afterClose)
            this.setState({showMessage:true})
            
        }
       
    }

   

    handleLogin(e){
        e.preventDefault()
        this.setState({disabled:true})
        axios.post('/api/login', {
            email: this.state.email, 
            pass: this.state.password
        })
        .then(res => {
            this.setState({error:false, disabled: false})
            this.props.signIn(res.data)
        })
        .catch(e => {
            this.setState({message: 'Email or password is incorrect' , error: true, disabled:false})
        })
    }

    

    closeR(){
        this.setState({showMessage:false, afterClose:true})
    }
    close(){
        this.setState({error: false})
    }

    render(){        
       
        return(
            this.props.reduxState.User.role === 'customer'?
            <CustomerHome />:
            this.props.reduxState.User.role === 'staff'?
            <AdminHome />:
            <Fragment>
                {this.state.error? 
                <ErrorMessage 
                close={this.close}
                />:
           
               this.state.showMessage?
              <RegisterMessage 
              closeR={this.closeR}
              strong={this.props.location.state.strong}
              message={this.props.location.state.message}
              />:
              console.log()
            
            }
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
            disabled={this.state.disabled}
            onClick={e => this.handleLogin(e)}
            >Submit</button>
            </div>
             <Link to='/register'>Register as a new customer</Link>
          </form>
          
          </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        reduxState: state
    }
}

export default connect(mapStateToProps, {signIn})(Login)