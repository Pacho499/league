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
export type DispatchType = (arg:SettingsAction) => SettingsAction

export interface languageObject {
    id:string,
    name:string
}

export interface inputSettings {
    placeHolder:string
    value:string,
    handleInput:function
    searchButton:boolean
}