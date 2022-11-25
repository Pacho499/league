// settings Type
export type SettingsState = {
    language: string
    server:string
    countryServer:string
    error:boolean
    loading:boolean
}

export type SettingsLanguageAction = {
    type : string,
    language:string,
}

export type SettingsServerAction = {
    type : string,
    server:string,
}

export interface languageObject {
    id:string,
    name:string
}

export interface inputSettings {
    placeHolder:string
    value:string,
    handleInput:function
    searchButton:boolean
    onClick:function
}

// Summoner type

export type SummonerState = {
    data: {
        encryptedSummonerId: string,
        puuid:string,
        name:string,
        lv:number,
        profileImage:number,
    }
    rank : []
    loaded:boolean
    loading:boolean
    error:boolean
}

export type SummonerData = {
    encryptedSummonerId: string,
    puuid:string,
    name:string,
    lv:number,
    profileImage:number,  
}

export type setSummonerDataAction = {
    type : string,
    encryptedSummonerId: string
    puuid:string,
    name:string
    lv:number
    profileImage:number,   
}

export type setRankAction = {
    type:string, 
    rank:[]
}

// auth Type
export type AuthState = {
    email: string, 
    token: string, 
    localId:string,
    loading: boolean,
    error:boolean
}

export type setAuthAction = {
    type : string,
    email:string,
    localId:string, 
    token:string,
}

// account types

export type AccountState = {
    champName: string[]
    summoner: any[]
    loading:boolean,
    error:boolean
}

export type setChampAction = {
    type : string,
    champName: string,
}

export type setSummonerPrefAction = {
    type: string,
    server:string,
    summonerName:string
}