import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {ProfileService} from "./ProfileService";
import {TranslationService} from "@angular-addons/translate";

@Injectable()
export class ProfileTitleResolver implements Resolve<string> {

    constructor(private profileService: ProfileService, private translationService: TranslationService) {}

    resolve(): Observable<string> {
        let onTitleLoad = new EventEmitter<string>();

        this.profileService.onProfileResolve
            .first()
            .subscribe(profile => {
                if(profile) {
                    onTitleLoad.emit(profile.name);
                } else {
                    onTitleLoad.emit(this.translationService.translate("Profile not found"));
                }
                
                onTitleLoad.complete();
            });

        return onTitleLoad;
    }
}