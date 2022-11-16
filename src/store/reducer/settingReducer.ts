import * as actionTypes from "../actionsType/SettingActionTypes"
import {SettingsState as State} from "../../@type/type"
import { AnyAction } from "redux"

const initialState : State = {
    languace : "it_IT",
    server : "EUW",
    error: false,
    loading:false,
}

const reducer = (state: State = initialState, action:AnyAction)=> {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUACE_START:
            return{
                ...state,
                loading:true,
                error:false
            }
        case actionTypes.CHANGE_LANGUACE_SUCCESS:
            return{
                ...state,
                loading:false,
                languace:action.languace
            }
        case actionTypes.CHANGE_LANGUACE_FAIL:
            return{
                ...state,
                loading:false,
                error: true
            }
        case actionTypes.CHANGE_SERVER_START:
            return{
                ...state,
                loading:true,
                error:false
            }
        case actionTypes.CHANGE_SERVER_SUCCESS:
            return{
                ...state,
                loading:false,
                server: action.server
            }
        case actionTypes.CHANGE_SERVER_FAIL:
            return{
                ...state,
                loading:false,
                error: true
            }
        default:
            return state
    }
}

export default reducer