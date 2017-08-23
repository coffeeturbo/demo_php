import {Component, HostListener} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";
import {Observable} from "rxjs";
import {Config} from "../../../../app/config";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["style.shadow.scss"]
})
export class ProfileSettingsRoute {
    public disabled: boolean = false;
    public profile: Profile = this.route.snapshot.data["profile"];
    public constraints = Config.profile.constraints;
    public form: FormGroup = new FormGroup({
        name: new FormControl(this.profile.name, Validators.required),
        alias: new FormControl(
            this.profile.alias,
            [
                Validators.minLength(this.constraints.alias.min_length),
                Validators.pattern(new RegExp(this.constraints.alias.match))
            ],
            this.aliasValidator.bind(this)
        ),
        gender: new FormControl(this.profile.gender),
        birth_date: new FormControl(this.profile.birth_date)
    });
    private defaultValues = JSON.parse(JSON.stringify(this.form.value));

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService
    ) {}

    private aliasValidator(aliasControl: AbstractControl): Promise<ValidationErrors> {
        if(!aliasControl.value || this.profile.alias === aliasControl.value) {
            return Observable.of(null).toPromise();
        }

        return this.profileService.checkAlias(aliasControl.value)
            .filter((checkAliasResponse) => !checkAliasResponse.available)
            .map(() => <ValidationErrors>{"alias_unavailable": true})
            .toPromise() // Конвертируем в promise потому что без этого form.valid всегда false (wtf?)
        ;
    }

    @HostListener('document:keydown.enter')
    public submit(): void {
        if (this.form.valid && !this.disabled) {
            this.disabled = true;
            let profile = Object.assign(JSON.parse(JSON.stringify(this.profile)), this.form.value);

            this.profileService.edit(profile, this.form.value, this.profile)
                .finally(() => this.disabled = false)
                .subscribe(profile => {
                    this.defaultValues = JSON.parse(JSON.stringify(this.form.value));
                    this.profile = profile;
                    this.form.markAsPristine();
                    this.router.navigate(["profile", this.profileService.getOwnProfilePath()]);
                })
            ;
        }
    }
}