import {HttpCodes} from "../Entity/HttpCodes";

export interface ResponseFailure {
    code: HttpCodes,
    message: string,
    errors?: { [param: string]: string }
}