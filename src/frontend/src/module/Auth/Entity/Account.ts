import {Role} from "./Role";

export interface Account {
    id: number,
    username: string,
    email: string,
    enabled: boolean,
    salt?: string,
    password: string,
    lastLogin?: string,
    confirmationToken?: string,
    passwordRequestedAt?: string,
    groups?: Array<any>,
    roles: Role[],
}