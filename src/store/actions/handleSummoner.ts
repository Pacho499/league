import { setSummonerDataAction, setRankAction } from '../../@type/type'
import * as actionTypes from "../actionsType/SummonerActionType" 


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
const setSummonerRankStart = () => {
    return{
        type: actionTypes.SET_SUMMONER_RANK_START,
        loaded:false
    }
}
const setSummonerRankSuccess: (rank:[]) => setRankAction = (rank) => {
    return{
        type: actionTypes.SET_SUMMONER_RANK_SUCCESS,
        rank
    }
}
const setSummonerRankFail = (error:any) => {
    return{
        type: actionTypes.SET_SUMMONER_RANK_FAIL,
        error: error
    }
}

export const setSummonerRank = (rank:[]) => {
    return (dispatch:any) => {
        dispatch(setSummonerRankStart());
        try {
            dispatch(setSummonerRankSuccess(rank))
        }
        catch (error){
            dispatch(setSummonerRankFail(error))
        }
    }
}

