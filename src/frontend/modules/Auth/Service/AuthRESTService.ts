import {Injectable} from "@angular/core";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {SignInResponse} from "../Http/Response/SignInResponse";
import {Observable} from "rxjs";
import {RESTService} from "../../Application/Service/RESTService";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {SignUpRequest} from "../Http/Request/SignUpRequest";

@Injectable()
export class AuthRESTService
{
    constructor(private rest: RESTService){}
    
    public signIn(signInRequest: SignInRequest): Observable<SignInResponse | ResponseFailure> 
    {
        let url = '/auth/sign-in';
        
        return this.rest
            .post(url, JSON.stringify(signInRequest))
            .map(res => res.json())
    }

    public signUp(signUpRequest: SignUpRequest): Observable<SignInResponse | ResponseFailure> 
    {
        let url = '/auth/sign-up';
        
        return this.rest
            .put(url, JSON.stringify(signUpRequest))
            .map(res => res.json())
    }
}