import * as actionTypes from '../actionsType/AccountActionsType'
import { setChampAction } from '../../@type/type'
import axios from 'axios'

const saveChampStart = () => {
    return{
        type: actionTypes.SAVE_CHAMP_START
    }
}


const saveChampSuccess : (data: any) => setChampAction = (data) => {
    return{
        type:actionTypes.SAVE_CHAMP_SUCCESS,
        champName:data
    }
}

const saveChampFail = (error:any) => {
    return{
        type:actionTypes.SAVE_CHAMP_FAIL,
        error: error
    }
}

export const saveChamp = (champName:string, localId:string, savedChamp:[]) => {
    return async (dispatch:any) => {
        dispatch(saveChampStart())
        try {
            
            
            const response = await axios.put(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefChamp.json`, 
                [...savedChamp,champName])
            console.log('champ Saved', response)
            dispatch(saveChampSuccess(champName))
        } catch (error) {
            dispatch(saveChampFail(error))
        }
    }
}
const fetchSavedChampStart = () => {
    return{
        type: actionTypes.FETCH_SAVED_CHAMP_START
    }
}

const fetchSavedChampSuccess = (data:string[]) => {
    return{
        type:actionTypes.FETCH_SAVED_CHAMP_SUCCESS,
        champName:data
    }
}

const fetchSavedChampFail = (error:any) => {
    return{
        type:actionTypes.FETCH_SAVED_CHAMP_FAIL,
        error: error
    }
}

export const fetchSavedChamp = (localId:string) => {
    return async (dispatch:any) => {
        dispatch(fetchSavedChampStart())
        try {
            const response = await axios.get(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefChamp.json`)
            const champName:string[] = []
            for (let key in response.data){
                if (response.data[key] !== null){
                   champName.push(response.data[key]) 
                }
                
            }
            console.log(champName)
            dispatch(fetchSavedChampSuccess(champName))
        } catch (error) {
            dispatch(fetchSavedChampFail(error))
        }
    }
}

const deleteSavedChampStart = () => {
    return{
        type: actionTypes.DELETE_CHAMP_START
    }
}

const deleteSavedChampSuccess = (data:string[]) => {
    
    return{
        type:actionTypes.DELETE_CHAMP_SUCCESS,
        saveChamp:data
    }
}

const deleteSavedChampFail = (error:any) => {
    return{
        type:actionTypes.DELETE_CHAMP_FAIL,
        error: error
    }
}

export const deleteSavedChamp = (localId:string, arrayId:number, savedChamp:[], champName:string) => {
    return async (dispatch:any) => {
        dispatch(deleteSavedChampStart())
        try {
            const response = await axios.delete(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefChamp/${arrayId}.json`)
            console.log('delete done',response)
            const newSavedChamp = savedChamp.filter(champ => champ !== champName)
            dispatch(deleteSavedChampSuccess(newSavedChamp))
        } catch (error) {
            dispatch(deleteSavedChampFail(error))
        }
    }
}

const saveSummonerStart = () => {
    return{
        type: actionTypes.SAVE_SUMMONER_START
    }
}


const saveSummonerSuccess = (data:any) => {
    return{
        type:actionTypes.SAVE_SUMMONER_SUCCESS,
        summoner:data
    }
}

const saveSummonerFail = (error:any) => {
    return{
        type:actionTypes.SAVE_SUMMONER_FAIL,
        error: error
    }
}

export const saveSummoner = (id:string, encryptedId:string, Name:string, localId:string,savedSummoner:[], Lv:number, Img:number) => {
    return async (dispatch:any) => {
        dispatch(saveSummonerStart())
        try {
            const summonerData = {
                id,
                encryptedId,
                Name,
                Lv,
                Img,
            }
            const response = await axios.put(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefSummoner.json`, 
                [...savedSummoner, summonerData] )
            dispatch(saveSummonerSuccess(response.data))
        } catch (error) {
            dispatch(saveSummonerFail(error))
        }
    }
}
const fetchSavedSummonerStart = () => {
    return{
        type: actionTypes.FETCH_SAVED_SUMMONER_START
    }
}


const fetchSavedSummonerSuccess = (data:any) => {
    return{
        type:actionTypes.FETCH_SAVED_SUMMONER_SUCCESS,
        summoner:data
    }
}

const fetchSavedSummonerFail = (error:any) => {
    return{
        type:actionTypes.FETCH_SAVED_SUMMONER_FAIL,
        error: error
    }
}

export const fetchSavedSummoner = (localId:string) => {
    return async (dispatch:any) => {
        dispatch(fetchSavedSummonerStart())
        try {
            const response = await axios.get(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefSummoner.json`)
            const summoner:any[] = []
            for (let key in response.data){
                if (response.data[key] !== null){
                   summoner.push(response.data[key]) 
                }
                
            }
            dispatch(fetchSavedSummonerSuccess(summoner))
        } catch (error) {
            dispatch(fetchSavedSummonerFail(error))
        }
    }
}

const deleteSavedSummonerStart = () => {
    return{
        type: actionTypes.DELETE_SAVED_SUMMONER_START
    }
}

const deleteSavedSummonerSuccess = (data:string[]) => {
    
    return{
        type:actionTypes.DELETE_SAVED_SUMMONER_SUCCESS,
        saveSummoner:data
    }
}

const deleteSavedSummonerFail = (error:any) => {
    return{
        type:actionTypes.DELETE_SAVED_SUMMONER_FAIL,
        error: error
    }
}

export const deleteSavedSummoner = (localId:string, arrayId:number, savedSummoner:[], sumName:string) => {
    return async (dispatch:any) => {
        dispatch(deleteSavedSummonerStart())
        try {
            const response = await axios.delete(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/${localId}/prefSummoner/${arrayId}.json`)
            console.log('delete done',response)
            const newSavedSummoner = savedSummoner.filter((summoner:any) => summoner.Name !== sumName)
            dispatch(deleteSavedSummonerSuccess(newSavedSummoner))
        } catch (error) {
            dispatch(deleteSavedSummonerFail(error))
        }
    }
}
