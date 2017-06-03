export interface LoaderBar {
    progress: number;
    state: LoaderBarState;
}

export enum LoaderBarState
{
    Active = 1,
    Inactive = 0,
}