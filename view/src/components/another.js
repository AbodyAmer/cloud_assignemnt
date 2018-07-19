import React, {Component, Fragment} from 'react'

class Another extends Component{

    constructor(props){
        super(props)
        this.state = {
            message: 'Welcome'
        }
        this.click = this.click.bind(this)
    }


    click(e){
        e.preventDefault()
        fetch('/api/getAnotherMessage')
        .then(res => console.log(res) || res.json())
        .then(data => this.setState({message: 'welcome ' + data.name}))
        .catch(e => console.log(e))
    }

    render(){
        
        console.log("Environment " , process.env.NODE_ENV )
          
        return(
            <Fragment>
            <h1>Another Route {this.state.message}</h1>
            <button 
            onClick={this.click}
            >
                Click
            </button>
            </Fragment>
        )
    }
}

export default Another