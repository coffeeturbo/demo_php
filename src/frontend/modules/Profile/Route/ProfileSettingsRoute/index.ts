import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["../../../Auth/Component/SignInForm/style.shadow.scss"]
})
export class ProfileSettingsRoute implements OnInit {
    public disabled: boolean;
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
            alias: new FormControl(this.profile.alias),
            gender: new FormControl(this.profile.gender),
            birth_date: new FormControl(this.profile.birth_date)
        });
    }

    public submit(): void {
        this.disabled = true;
        let profile = Object.assign(Object.create(this.profile), this.form.value);
        this.profileService.edit(profile, this.form.value, this.profile)
            .finally(() => this.disabled = false)
            .subscribe();
    }
}