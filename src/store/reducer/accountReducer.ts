import * as actionTypes from "../actionsType/AccountActionsType"
import {AccountState as State} from "../../@type/type"
import { AnyAction } from "redux"

const initialState : State = {
    champName: [],
    summoner:[],
    loading:false,
    error:false,
}

const reducer = (state: State = initialState, action:AnyAction): State => {
    switch (action.type) {
       case actionTypes.SAVE_CHAMP_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.SAVE_CHAMP_SUCCESS:
            return{
                ...state,
                champName: [...state.champName, action.champName],
                loading:true,
                error:false
            }
       case actionTypes.SAVE_CHAMP_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_CHAMP_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_CHAMP_SUCCESS:
            return{
                ...state,
                champName: action.champName,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_CHAMP_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_CHAMP_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_CHAMP_SUCCESS:
            return{
                ...state,
                champName: action.saveChamp,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_CHAMP_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.SAVE_SUMMONER_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.SAVE_SUMMONER_SUCCESS:
            return{
                ...state,
                summoner: action.summoner,
                loading:true,
                error:false
            }
       case actionTypes.SAVE_SUMMONER_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_SUMMONER_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_SUMMONER_SUCCESS:
            return{
                ...state,
                summoner: action.summoner,
                loading:true,
                error:false
            }
       case actionTypes.FETCH_SAVED_SUMMONER_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_SAVED_SUMMONER_START:
            return{
                ...state,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_SAVED_SUMMONER_SUCCESS:
            return{
                ...state,
                summoner: action.saveSummoner,
                loading:true,
                error:false
            }
       case actionTypes.DELETE_SAVED_SUMMONER_FAIL:
            return{
                ...state,
                loading:true,
                error:false
            }
        
        default:
            return state
    }
}

export default reducer