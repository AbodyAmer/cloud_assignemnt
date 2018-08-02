import React, {Component, Fragment} from 'react'
var validator = require("email-validator")
import ErrorMessage from '../message/message'
import axios from 'axios'
import Login from '../../login/login'
class Register extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: '',
            password: '',
            confirmPass: '', 
            email: '', 
            match: true, 
            message: '', 
            error: false,
            disabled: false, 
            
       }
       this.close = this.close.bind(this)
    }

    handle(e){
        e.preventDefault()
        this.setState({disabled:true})
        const isEmail = validator.validate(this.state.email)
        if(this.state.email === '' || this.state.name === '' || this.state.password === ''){
            this.setState({message: 'Fill in all the requirements' , error: true, disabled:false})
        }
        else if(!isEmail){
           this.setState({message: 'Enter a valid email' , error: true, disabled:false})
        }
        else if(!this.state.match){
           this.setState({message: 'Passwords do not match' , error:true, disabled:false})
        }
        else{
            axios.post('/api/register', {
                name:this.state.name, 
                password:this.state.password, 
                email:this.state.email
            })
            .then(res => {
            if(res.data === 'Email Is Used'){
                this.setState({message: 'Email is already used' , error:true, disabled: false})
                return
            }

            this.props.history.push({
                pathname: '/',
                state:{
                    strong: 'Registration is completed!',
                    message: 'Try to login now',
                    show:true
                }
            })
            
            })
            .catch(e => this.setState({message: 'Server error try again' , error:true, disabled: false}))
        }


    }

    close(){
        this.setState({error:false})
    }

    componentDidUpdate(){

        if(this.state.password === this.state.confirmPass && !this.state.match){
            this.setState({match: true})
        }
        else if(this.state.password !== this.state.confirmPass && this.state.match)
        {
            this.setState({match:false})
        }
       
    }

    render(){
        
        return(
           
            <Fragment>
                {this.state.error?
                  <ErrorMessage 
                  message={this.state.message}
                  close={this.close}
                  />:
                  console.log()
            }
            <form >
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Name</label>
              <input 
              onChange={e => this.setState({name: e.target.value})}
              type="text" className="form-control"  placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Email</label>
              <input 
              onChange={e => this.setState({email: e.target.value})}
              type="email" className="form-control"  placeholder="Enter a valid email" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Password</label>
              <input 
              onChange={e => this.setState({password: e.target.value}) }
              type="password" className="form-control"  placeholder="Enter your password" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Confirm Password</label>
              <input 
               onChange={e => this.setState({confirmPass: e.target.value}) }
              type="password" className="form-control" id="formGroupExampleInput2" placeholder="confirm your password" />
              { !this.state.match?
              <div id="emailHelp" className="form-text text-muted" style={{'color': 'red'}}>Passowrd doesn't match</div>:
              console.log()
              }</div>

              <button
              disabled={this.state.disabled}
              className='btn btn-primary'
              onClick={e => this.handle(e)}
              >
               Register
              </button>
          </form>
          </Fragment>
       
        )
    }
}

export default Register