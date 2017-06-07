import {Roles} from "./Role";

export interface Token {
    exp: number,
    iat: number,
    roles: Roles,
    profile_id: number,
    profile_alias: string,
    username: string
}