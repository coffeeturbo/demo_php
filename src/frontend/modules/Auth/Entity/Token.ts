import {Roles} from "./Role";
export interface Token {
    exp: string,
    iat: number,
    roles: Roles,
    profile_id: number,
    profile_alias: string,
    username: string
}