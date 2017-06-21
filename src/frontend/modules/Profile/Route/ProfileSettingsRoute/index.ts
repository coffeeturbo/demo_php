import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";
import {Observable} from "rxjs";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["../../../Auth/Component/SignInForm/style.shadow.scss"]
})
export class ProfileSettingsRoute implements OnInit {
    public disabled: boolean = false;
    public profile: Profile;
    public form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
        this.form = new FormGroup({
            name: new FormControl(this.profile.name),
            alias: new FormControl(this.profile.alias, Validators.minLength(3), this.aliasValidator.bind(this)),
            gender: new FormControl(this.profile.gender),
            birth_date: new FormControl(this.profile.birth_date)
        });
    }
    
    aliasValidator(aliasControl: AbstractControl): Observable<ValidationErrors> {
        if(this.profile.alias === aliasControl.value) return Observable.of([]);
        return this.profileService.checkAlias(aliasControl.value).filter((checkAliasResponse) => !checkAliasResponse.available);
    }

    public submit(): void {
        this.disabled = true;
        let profile = Object.assign(Object.create(this.profile), this.form.value);
        this.profileService.edit(profile, this.form.value, this.profile)
            .finally(() => this.disabled = false)
            .subscribe();
    }
}