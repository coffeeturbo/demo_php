import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Profile} from "../Entity/Profile";
import {ProfileService} from "./ProfileService";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    public onResolve: Observable<Profile>;
    
    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
        this.onResolve = (route.params.hasOwnProperty("path") ? this.profileService.get(route.params.path) : this.profileService.getOwnProfile())
            .publishReplay(1)
            .refCount()
            .catch(() => Observable.of(null)) // if profile not found;
        ;

        return this.onResolve
    }
}