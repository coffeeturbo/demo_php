import {Roles} from "./Role";
export interface Token {
    exp: string,
    iat: number,
    roles: Roles,
    username: string
}