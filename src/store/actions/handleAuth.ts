import * as actionTypes from '../actionsType/AuthActionsType'
import { setAuthAction } from '../../@type/type'
import { FirebaseKey } from '../../data'
import axios from 'axios'

const handleAuthStart = () => {
    return{
        type: actionTypes.SIGN_UP_START
    }
}


const handleAuthSuccess : (data: any) => setAuthAction = (data) => {
    return{
        type:actionTypes.SIGN_UP_SUCCESS,
        email: data.email, 
        token: data.idToken,
        localId: data.localId
    }
}

const handleAuthFail = (error:any) => {
    return{
        type:actionTypes.SIGN_UP_FAIL,
        error: error
    }
}

export const handleAuth = (email:string, password:string) => {
    return async (dispatch:any) => {
        dispatch(handleAuthStart())
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FirebaseKey}`, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            console.log(response.data)
            dispatch(handleAuthSuccess(response.data))
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)
        } catch (error) {
            dispatch(handleAuthFail(error))
        }
    }
}

const logInStart = () => {
    return{
        type:actionTypes.LOG_IN_START
    }
}

const logInSuccess: (data:any) => setAuthAction = (data) => {
    return{
        type:actionTypes.LOG_IN_SUCCESS,
        email: data.email, 
        token: data.idToken,
        localId: data.localId
    }
}
const logInFail = (error:any) => {
    return{
        type:actionTypes.LOG_IN_FAIL,
        error:error
    }
}

export const logIn = (email:string, password:string) => {
    return async (dispatch:any) => {
        dispatch(logInStart())
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FirebaseKey}`,{
                email: email,
                password:password,
                returnSecureToken:true,
            })
            console.log(response)
            dispatch(logInSuccess(response.data))
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)

        } catch (error) {
            dispatch(logInFail(error))
        }
    }
    
}

export const authCheck = () => {
    return (dispatch:any) => {
        const token = localStorage.getItem('token')
        if(!token){
            return;
        }
        const userId = localStorage.getItem('userId')
        dispatch(logInSuccess({
            idToken: token, 
            localId: userId
        }))
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}