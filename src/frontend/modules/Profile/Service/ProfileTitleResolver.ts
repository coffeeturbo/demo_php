import {EventEmitter, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {Profile} from "../Entity/Profile";
import {ProfileService} from "./ProfileService";
import {Observer} from "rxjs/Observer";
import {ProfileRESTService} from "./ProfileRESTService";

@Injectable()
export class ProfileTitleResolver implements Resolve<string> {

    constructor(private profileService: ProfileService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<string>
    {
        let onTitleLoad: EventEmitter<string> = new EventEmitter();
        
        this.profileService.onProfileResolve
            .map(profile => profile.first_name + " " + profile.last_name)
            .subscribe((title) => {
                onTitleLoad.emit(title);
                onTitleLoad.complete();
            });

        return onTitleLoad;
    }
}