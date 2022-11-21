import { combineReducers } from "redux";
import settingsReducer from "./settingReducer";
import summonerReducer from './summonerReducer'

const rootReducer = combineReducers({
    settingsReducer,
    summonerReducer
});

export default rootReducer;