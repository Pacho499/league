import { combineReducers } from "redux";
import settingsReducer from "./settingReducer";
import summonerReducer from './summonerReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    settingsReducer,
    summonerReducer,
    authReducer
});

export default rootReducer;