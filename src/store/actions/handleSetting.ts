import * as actionTypes from "../actionsType/SettingActionTypes" 
import { SettingsAction } from "../../@type/type"

const changeLanguaceStart = () => {
    return{
        type: actionTypes.CHANGE_LANGUACE_START,
    }
}
const changeLanguaceSuccess: (languace:string) => SettingsAction = (languace) => {
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