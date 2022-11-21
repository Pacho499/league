import { setSummonerDataAction } from '../../@type/type'
import * as actionTypes from "../actionsType/SummonerActionType" 
import { SummonerData } from '../../@type/type'


const setSummonerDataStart = () => {
    return{
        type: actionTypes.SET_SUMMONER_DATA_START,
        loaded:false
    }
}
const setSummonerDataSuccess: (encryptedSummonerId:string, puuid:string, name:string, lv:number, profileImage:number) => setSummonerDataAction = (encryptedSummonerId, puuid, name, lv, profileImage) => {
    return{
        type: actionTypes.SET_SUMMONER_DATA_SUCCESS,
        encryptedSummonerId,
        puuid,
        name,
        lv,
        profileImage,
        loaded:true
    }
}
const setSummonerDataFail = (error:any) => {
    return{
        type: actionTypes.SET_SUMMONER_DATA_FAIL,
        error: error
    }
}

export const setSummonerData = (encryptedSummonerId:string, puuid:string, name:string, lv:number, profileImage:number) => {
    return (dispatch:any) => {
        dispatch(setSummonerDataStart());
        try {
            dispatch(setSummonerDataSuccess(encryptedSummonerId, puuid, name, lv, profileImage))
        }
        catch (error){
            dispatch(setSummonerDataFail(error))
        }
    }
}

