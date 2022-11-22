import * as actionTypes from "../actionsType/AuthActionsType"
import {AuthState as State} from "../../@type/type"
import { AnyAction } from "redux"

const initialState : State = {
    email: '',
    token: '',
    localId: '',
    loading:false,
    error:false,
}

const reducer = (state: State = initialState, action:AnyAction)=> {
    switch (action.type) {
        case actionTypes.SIGN_UP_START:
            return{
                ...state,
                loading:true,
                error:false
            }
        case actionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                email:action.email,
                localId:action.localId,
                token:action.token,
                loading:false,
                error:false
            }
        case actionTypes.SIGN_UP_FAIL:
            return{
                ...state,
                loading:true,
                error:true
            }
        case actionTypes.LOG_IN_START:
            return{
                ...state,
                loading:true,
                error:false
            }
        case actionTypes.LOG_IN_SUCCESS:
            return{
                ...state,
                email:action.email,
                localId:action.localId,
                token:action.token,
                loading:false,
                error:false
            }
        case actionTypes.LOG_IN_FAIL:
            return{
                ...state,
                loading:true,
                error:true
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                token:null
            }
        default:
            return state
    }
}

export default reducer