import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";
import {Observable} from "rxjs";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["style.shadow.scss"],
    host: {"(window:keydown)": "onKeyDown($event)"}
})
export class ProfileSettingsRoute implements OnInit {
    public disabled: boolean = false;
    public profile: Profile;
    public form: FormGroup;
    public defaultValues;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
        this.form = new FormGroup({
            name: new FormControl(this.profile.name, Validators.required),
            alias: new FormControl(this.profile.alias, Validators.minLength(3), this.aliasValidator.bind(this)),
            gender: new FormControl(this.profile.gender),
            birth_date: new FormControl(this.profile.birth_date)
        });
        this.defaultValues = JSON.parse(JSON.stringify(this.form.value));
    }

    private onKeyDown($event: KeyboardEvent): void {
        if ($event.key === "Enter" && this.form.valid && !this.disabled) {
            this.submit()
        }
    }
    
    private aliasValidator(aliasControl: AbstractControl): Promise<ValidationErrors> {
        if(!aliasControl.value || this.profile.alias === aliasControl.value) {
            return Observable.of([]).toPromise();
        }

        return this.profileService.checkAlias(aliasControl.value)
            .filter((checkAliasResponse) => !checkAliasResponse.available)
            .map(() => <ValidationErrors>{"alias_unavailable": true})
            .toPromise()
        ;
    }

    public reset(): void {
        this.form.reset(this.defaultValues);
    }
    
    public changed() : boolean {
        return  JSON.stringify(this.defaultValues) !== JSON.stringify(this.form.value);
    }

    public submit(): void {
        this.disabled = true;
        // let profile = Object.assign(JSON.parse(JSON.stringify(this.profile)), this.form.value);
        let profile = Object.assign(this.profile, this.form.value);
        this.profileService.edit(profile, this.form.value, this.profile)
            .finally(() => this.disabled = false)
            .subscribe(profile => {
                this.defaultValues = JSON.parse(JSON.stringify(this.form.value));
                this.profile = profile;
            })
        ;
    }
}