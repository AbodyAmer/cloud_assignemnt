import {login, loginout} from '../../action/shared'

const User = (state = {} , action) => {
    switch(action.type){
        case login: 
         return action.user
         
         case loginout: 
         return {
             user: undefined
         }
         default: 
         return state
    }
}

export default User