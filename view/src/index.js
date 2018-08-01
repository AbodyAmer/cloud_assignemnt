import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import {Provider} from 'react-redux'
import store from './reducer/config'
ReactDOM.render(
    <Provider store={store}>
      <App /> 
    </Provider>
, document.querySelector('#app')
)