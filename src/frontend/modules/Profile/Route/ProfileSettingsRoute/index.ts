import {Component, HostListener} from "@angular/core";
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";
import {Observable} from "rxjs";
import {Config} from "../../../../app/config";
import {AuthService} from "../../../Auth/Service/AuthService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["style.shadow.scss"]
})
export class ProfileSettingsRoute {
    public disabled: boolean = false;
    public submitted: boolean = false;
    public profile: Profile = this.route.snapshot.data["profile"];
    public constraints = Config.profile.constraints;
    public config = Config;
    public form: FormGroup = new FormGroup({
        editProfileGroup: new FormGroup({
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
            birth_date: new FormControl(this.profile.birth_date),
        }),
        changePasswordGroup: new FormGroup({
            old_password: new FormControl(),
            password: new FormControl(),
            password_confirm: new FormControl()
        })
    });
    private defaultValues = JSON.parse(JSON.stringify(this.form.value));

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService,
        private authService: AuthService
    ) {}
    
    ngOnInit() {
        this.form.get("changePasswordGroup").valueChanges
            .subscribe((value) => {
                if (value.password !== value.password_confirm) {
                    this.form.get("changePasswordGroup").get("password_confirm").setErrors({"not_equal_passwords": true});
                } else {
                    this.form.get("changePasswordGroup").get("password_confirm").setErrors(null);
                }

                if(value.password && !(new RegExp(this.config.account.constraints.password.match)).test(value.password)) {
                    this.form.get("changePasswordGroup").get("password").setErrors({"invalid": true });
                } else {
                    this.form.get("changePasswordGroup").get("password").setErrors(null);
                }

                if ((value.password || value.password_confirm) && !value.old_password ) {
                    this.form.get("changePasswordGroup").get("old_password").setErrors({"required": true });
                } else {
                    this.form.get("changePasswordGroup").get("old_password").setErrors(null);
                }
            })
        ;
    }

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
    
    @HostListener('document:keyup.enter')
    public submit(): void {
        this.submitted = true;
        if (this.form.valid && !this.disabled) {
            this.disabled = true;
            let profile = Object.assign(JSON.parse(JSON.stringify(this.profile)), this.form.value.editProfileGroup);
            let observables = [];

            if (!this.form.controls.editProfileGroup.pristine) {
                observables.push(this.profileService.edit(profile, this.form.value.editProfileGroup, this.profile))

            }

            let changePasswordGroup: FormGroup = <FormGroup>this.form.controls.changePasswordGroup;
            
            if (!changePasswordGroup.pristine) {
                observables.push(
                    this.authService.changePassword(changePasswordGroup.value).catch((e) => {
                        changePasswordGroup.controls["old_password"].setErrors({'invalid_password': true});
                            return Observable.throw(e);
                        }));
            }

            Observable
                .combineLatest(observables)
                .finally(() => this.disabled = false)
                .subscribe(() => this.router.navigate(["profile", this.profileService.getOwnProfilePath()]))
            ;
        }
    }
    
    public reset() {
        this.form.reset(this.defaultValues);
        this.submitted = false;
    }
}