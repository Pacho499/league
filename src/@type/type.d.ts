export type SettingsState = {
    languace: string
    server:string
    error:boolean
    loading:boolean
}

export type SettingsAction = {
    type : string,
    languace:string
}
export type DispatchType = (arg:SettingsAction) => SettingsAction