export type SettingsState = {
    languace: string
    server:string
    error:boolean
    loading:boolean
}

export type SettingsLanguaceAction = {
    type : string,
    languace:string,
}

export type SettingsServerAction = {
    type : string,
    server:string,
}
export type DispatchType = (arg:SettingsAction) => SettingsAction

export interface languaceObject {
    id:string,
    name:string
}

export interface inputSettings {
    placeHolder:string
    value:string,
    handleInput:function
    searchButton:boolean
}