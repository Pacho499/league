import * as actionTypes from '../actionsType/SettingActionTypes';
import {SettingsState as State} from '../../@type/type';
import {AnyAction} from 'redux';

const initialState: State = {
  dragonDB: '',
  language: 'it_IT',
  server: 'EUW1',
  countryServer: 'europe',
  error: false,
  loading: false,
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: action.language,
      };
    case actionTypes.CHANGE_LANGUAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.CHANGE_SERVER_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.CHANGE_SERVER_SUCCESS:
      return {
        ...state,
        loading: false,
        server: action.server,
      };
    case actionTypes.CHANGE_SERVER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.SET_DB_VERSION_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.SET_DB_VERSION_SUCCESS:
      return {
        ...state,
        loading: false,
        dragonDB: action.dbVersion,
      };
    case actionTypes.SET_DB_VERSION_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
