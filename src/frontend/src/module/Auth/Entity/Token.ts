import {Role} from "./Role";
export interface Token {
    exp: string,
    iat: number,
    roles: Role[],
    username: string
}