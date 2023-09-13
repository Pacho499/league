import * as actionTypes from '../actionsType/SettingActionTypes';
import {
  SettingsDBVersion,
  SettingsLanguageAction,
  SettingsServerAction,
} from '../../@type/type';
import axios from 'axios';

const changeLanguageStart = () => {
  return {
    type: actionTypes.CHANGE_LANGUAGE_START,
  };
};
const changeLanguageSuccess: (language: string) => SettingsLanguageAction = (
  language,
) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE_SUCCESS,
    language,
  };
};
const changeLanguageFail = (error: any) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE_FAIL,
    error: error,
  };
};

export const changeLanguage = (language: string) => {
  return (dispatch: any) => {
    dispatch(changeLanguageStart());
    try {
      dispatch(changeLanguageSuccess(language));
    } catch (error) {
      dispatch(changeLanguageFail(error));
    }
  };
};
const changeServerStart = () => {
  return {
    type: actionTypes.CHANGE_SERVER_START,
  };
};
const changeServerSuccess: (server: string) => SettingsServerAction = (
  server,
) => {
  return {
    type: actionTypes.CHANGE_SERVER_SUCCESS,
    server,
  };
};
const changeServerFail = (error: any) => {
  return {
    type: actionTypes.CHANGE_SERVER_FAIL,
    error: error,
  };
};

export const changeServer = (server: string) => {
  return (dispatch: any) => {
    dispatch(changeServerStart());
    try {
      dispatch(changeServerSuccess(server));
    } catch (error) {
      dispatch(changeServerFail(error));
    }
  };
};

const setDBVersionStart = () => {
  return {
    type: actionTypes.SET_DB_VERSION_START,
  };
};
const setDBVersionSuccess: (dbVersion: string) => SettingsDBVersion = (
  dbVersion,
) => {
  return {
    type: actionTypes.SET_DB_VERSION_SUCCESS,
    dbVersion,
  };
};
const setDBVersionFail = (error: any) => {
  return {
    type: actionTypes.SET_DB_VERSION_FAIL,
    error: error,
  };
};

export const setDBVersion = () => {
  return async (dispatch: any) => {
    dispatch(setDBVersionStart());
    const allDragonVersion: {data: string[]} = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json',
    );
    const dbVersion = allDragonVersion.data[0];
    try {
      dispatch(setDBVersionSuccess(dbVersion));
    } catch (error) {
      dispatch(setDBVersionFail(error));
    }
  };
};
