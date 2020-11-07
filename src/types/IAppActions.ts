export interface ISetStatus {
    type: string;
    payload: boolean;
}

export type IAppActions = ISetStatus;

export const appAction = 'appAction';
