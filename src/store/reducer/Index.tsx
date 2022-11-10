import { combineReducers } from "redux";
import settingsReducer from "./settingReducer";

const rootReducer = combineReducers({
    settingsReducer,
});

export default rootReducer;