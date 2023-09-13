// settings Type
export type SettingsState = {
  language: string;
  server: string;
  countryServer: string;
  error: boolean;
  loading: boolean;
  dragonDB: string;
};

export type SettingsLanguageAction = {
  type: string;
  language: string;
};

export type SettingsServerAction = {
  type: string;
  server: string;
};

export type SettingsDBVersion = {
  type: string;
  dbVersion: string;
};

export interface languageObject {
  id: string;
  name: string;
}

export interface inputSettings {
  placeHolder: string;
  value: string;
  handleInput: function;
  searchButton: boolean;
  onClick: function;
}

// Summoner type

export type SummonerState = {
  data: {
    encryptedSummonerId: string;
    puuid: string;
    name: string;
    lv: number;
    profileImage: number;
  };
  rank: [];
  loaded: boolean;
  loading: boolean;
  error: boolean;
};

export type SetSummonerDataProps = {
  encryptedSummonerId: string;
  puuid: string;
  name: string;
  lv: number;
  profileImage: number;
};

export type SummonerData = {
  encryptedSummonerId: string;
  puuid: string;
  name: string;
  lv: number;
  profileImage: number;
};

export type SummonerDataDispatch = {
  summoner: SummonerData;
};

export type setSummonerDataAction = {
  type: string;
  encryptedSummonerId: string;
  puuid: string;
  name: string;
  lv: number;
  profileImage: number;
};

export type setRankAction = {
  type: string;
  rank: [];
};

// auth Type
export type AuthState = {
  email: string;
  token: string;
  localId: string;
  loading: boolean;
  error: boolean;
};

export type setAuthAction = {
  type: string;
  email: string;
  localId: string;
  token: string;
};

// account types

export type AccountState = {
  champName: string[];
  summoner: any[];
  loading: boolean;
  error: boolean;
};

export type setChampAction = {
  type: string;
  champName: string;
};

export type setSummonerPrefAction = {
  type: string;
  server: string;
  summonerName: string;
};

export type DeleteSavedChampProps = {
  localId: string;
  arrayId: string | undefined;
  savedChamp: [];
  champName: string | undefined;
};

export type SaveSummonerProps = {
  id: string;
  encryptedId: string;
  name: string;
  localId: string;
  savedSummoner: [];
  lv: number;
  img: number;
};
export type DeleteSummonerProps = {
  localId: string;
  arrayId: string | undefined;
  savedSummoner: [];
  sumName: string;
};

export type AccountSummonerData = {
  id: string;
  encryptedId: string;
  img: number;
  lv: number;
  name: string;
};
