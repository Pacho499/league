import * as actionTypes from "../actionsType/SummonerActionType"
import {SummonerState as State} from "../../@type/type"
import { AnyAction } from "redux"

const initialState : State = {
    data:  {
        encryptedSummonerId: '',
        puuid:'', 
        name:'',
        lv: 0,
        profileImage:0,
    },
    rank : [],
    loaded: false,
    loading:false,
    
}

const reducer = (state: State = initialState, action:AnyAction)=> {
    switch (action.type) {
        case actionTypes.SET_SUMMONER_DATA_START:
            return{
                ...state,
                error:false
            }
        case actionTypes.SET_SUMMONER_DATA_SUCCESS:
            return{
                ...state,
                data : {
                  encryptedSummonerId: action.encryptedSummonerId,
                puuid:action.puuid,
                name:action.name,
                lv: action.lv,
                profileImage: action.profileImage,
                },
                loaded:true,  
                
            }
        case actionTypes.SET_SUMMONER_DATA_FAIL:
            return{
                ...state,
                loading:false,
                error: true
            }
        
        case actionTypes.SET_SUMMONER_RANK_START:
            return{
                ...state,
                error:false,
                loading:true
            }
        case actionTypes.SET_SUMMONER_RANK_SUCCESS:
            return{
                ...state,
                rank : action.rank,
                loading:false
            }
        case actionTypes.SET_SUMMONER_RANK_FAIL:
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