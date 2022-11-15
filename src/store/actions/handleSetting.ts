import * as actionTypes from "../actionsType/SettingActionTypes" 
import { SettingsLanguaceAction, SettingsServerAction } from "../../@type/type"

const changeLanguaceStart = () => {
    return{
        type: actionTypes.CHANGE_LANGUACE_START,
    }
}
const changeLanguaceSuccess: (languace:string) => SettingsLanguaceAction = (languace) => {
    return{
        type: actionTypes.CHANGE_LANGUACE_SUCCESS,
        languace
    }
}
const changeLanguaceFail = (error:any) => {
    return{
        type: actionTypes.CHANGE_LANGUACE_FAIL,
        error: error
    }
}

export const changeLanguace = (languace:string) => {
    return (dispatch:any) => {
        dispatch(changeLanguaceStart());
        try {
            dispatch(changeLanguaceSuccess(languace))
        }
        catch (error){
            dispatch(changeLanguaceFail(error))
        }
    }
}
const changeServerStart = () => {
    return{
        type: actionTypes.CHANGE_SERVER_START,
    }
}
const changeServerSuccess: (server:string) => SettingsServerAction = (server) => {
    return{
        type: actionTypes.CHANGE_SERVER_SUCCESS,
        server
    }
}
const changeServerFail = (error:any) => {
    return{
        type: actionTypes.CHANGE_SERVER_FAIL,
        error: error
    }
}

export const changeServer = (server:string) => {
    return (dispatch:any) => {
        dispatch(changeServerStart());
        try {
            dispatch(changeServerSuccess(server))
        }
        catch (error){
            dispatch(changeServerFail(error))
        }
    }
}