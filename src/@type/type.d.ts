export type SettingsState = {
    languace: string
    server:string
    error:boolean
    loading:boolean
}

type SettingsAction = {
    type : string,
    languace:string
}

type DispatchType = (arg:SettingsAction) => SettingsAction