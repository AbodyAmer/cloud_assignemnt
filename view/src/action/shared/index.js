export const login = 'LOGIN'
export const loginout = 'LOGOUT'

export const signIn = (user) => {
    const action = {
        type:login, 
        user
    }
    return action
}

export const logOut = () => {
    const action = {
        type: loginout, 
    }
    return action 
}