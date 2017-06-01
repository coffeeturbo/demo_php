import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    constructor(private rest: ProfileRESTService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Profile | ResponseFailure> 
    {
        return this.rest.get(route.params.id).map((profileGetResponse: ProfileGetResponse) => profileGetResponse.entity);
    }
}