import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Profile} from "../Entity/Profile";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {ProfileService} from "./ProfileService";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    private currentProfilePath = 1;
    constructor(private profileService: ProfileService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Profile | ResponseFailure> 
    {
        
        return this.profileService.get(route.params.path || this.currentProfilePath)
    }
}