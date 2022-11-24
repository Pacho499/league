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
            
            const response = await axios.put(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/userId/id/${localId}/prefChamp.json`, 
                [...savedChamp,champName])
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
            const response = await axios.get(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/userId/id/${localId}/prefChamp.json`)
            const champName:string[] = []
            console.log(response.data)
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
            const response = await axios.delete(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/userId/id/${localId}/prefChamp/${arrayId}.json`)
            const newSavedChamp = savedChamp.filter(champ => champ !== champName)
            dispatch(deleteSavedChampSuccess(newSavedChamp))
        } catch (error) {
            dispatch(deleteSavedChampFail(error))
        }
    }
}

