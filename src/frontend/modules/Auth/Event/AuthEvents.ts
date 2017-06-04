import {EventEmitter, Injectable} from "@angular/core";

import {TokenResponse} from "../Http/Response/TokenResponse";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";

@Injectable()
export class AuthEvents {
    public onSuccess = new EventEmitter<TokenResponse>();
    public onFail = new EventEmitter<ResponseFailure>();
}