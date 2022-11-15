import * as actionTypes from "../actionsType/SettingActionTypes"
import {SettingsServerAction, SettingsState as State} from "../../@type/type"

const initialState : State = {
    languace : "it_IT",
    server : "EUW",
    error: false,
    loading:false,
}

const reducer = (state: State = initialState, action:SettingsServerAction)=> {
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