import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {ProfileService} from "./ProfileService";
import {ProfileResolver} from "./ProfileResolver";

@Injectable()
export class ProfileTitleResolver implements Resolve<string> {

    constructor(private profileService: ProfileService, private profileResolver: ProfileResolver) {}

    resolve(): Observable<string> {
        return this.profileResolver.onResolve
            .map(profile => profile.name)
            .catch(() => Observable.of("Profile not found"))
    }
}