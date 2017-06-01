import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileRESTService} from "../../Service/ProfileRESTService";
import {ProfileResolver} from "../../Service/ProfileResolver";
import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";

@Component({
    templateUrl: './template.pug',
    styleUrls: ["../../../Auth/Component/SignInForm/style.shadow.scss"]
})
export class ProfileSettingsRoute implements OnInit {
    public profile: Profile;
    public form: FormGroup = new FormGroup({
        alias: new FormControl(""),
        // birth_date: new FormControl(""),
        // gender: new FormControl(""),
        // first_name: new FormControl(""),
        // last_name: new FormControl(""),
        // nickname: new FormControl(""),
        // patronymic: new FormControl("")
    });
    
    constructor(private profileService: ProfileService){}
    
    ngOnInit() {
        this.profileService.get("killers").subscribe((profile: Profile) => {
            this.profile = profile;
        });
    }

    public submit() {
        let formData = this.form.value;
        let profile: Profile = JSON.parse(JSON.stringify(this.profile));
        profile.alias = formData['alias']; 
        
        this.profileService.replaceInCache(this.profile, profile)
    }
}
