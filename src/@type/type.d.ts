// settings Type
export type SettingsState = {
    language: string
    server:string
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
    loaded:boolean
    
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