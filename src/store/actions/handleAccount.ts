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

export const saveChamp = (champName:string, localId:string) => {
    return async (dispatch:any) => {
        dispatch(saveChampStart())
        try {
            
            const response = await axios.post(`https://lolwiki-f14e9-default-rtdb.firebaseio.com/userId/id/${localId}/prefChamp.json`, {
                champName
            })
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

// eslint-disable-next-line
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
            console.log(response.data)
            const champName:string[] = []
            for (let key in response.data){
                champName.push(response.data[key].champName)
            }
            dispatch(fetchSavedChampSuccess(champName))
        } catch (error) {
            dispatch(fetchSavedChampFail(error))
        }
    }
}