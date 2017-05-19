import {Response} from "../../../Application/Http/Response";

export interface TokenResponse extends Response {
    token: string;
}