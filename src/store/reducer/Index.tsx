import { combineReducers } from "redux";
import settingsReducer from "./settingReducer";
import summonerReducer from './summonerReducer'
import authReducer from './authReducer'
import accountReducer from './accountReducer'

const rootReducer = combineReducers({
    settingsReducer,
    summonerReducer,
    accountReducer,
    authReducer
});

export default rootReducer;