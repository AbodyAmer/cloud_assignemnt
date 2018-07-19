import React, {Component, Fragment} from 'react'

class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            message: 'Rebuild'
        }
        this.click = this.click.bind(this)
    }


    click(e){
        e.preventDefault()
        fetch('/api/getMessage')
        .then(res => console.log(res) || res.json())
        .then(data => this.setState({message: 'Rebuild ' + data.name}))
        .catch(e => console.log(e))
    }

    render(){
        
        console.log("Environment " , process.env.NODE_ENV )
          
        return(
            <Fragment>
            <h1>{this.state.message}</h1>
            <button 
            onClick={this.click}
            >
                Click
            </button>
            </Fragment>
        )
    }
}

export default App