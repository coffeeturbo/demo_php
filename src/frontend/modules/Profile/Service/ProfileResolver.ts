import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Profile} from "../Entity/Profile";
import {ProfileService} from "./ProfileService";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
        return route.params.hasOwnProperty("path") ?
            this.profileService.get(route.params.path) :
            this.profileService.getOwnProfile()
        ;
    }
}