import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../../Service/ProfileService";
import {Profile} from "../../Entity/Profile";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './template.pug',
    styleUrls: ["../../../Auth/Component/SignInForm/style.shadow.scss"]
})
export class ProfileSettingsRoute implements OnInit, OnChanges {
    public profile: Profile;
    public form: FormGroup; 

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService
    ){}
    
    ngOnInit() {
        this.profile = this.route.snapshot.data['profile'];
        this.form = new FormGroup({
            alias: new FormControl(this.profile.alias),
            birth_date: new FormControl(this.profile.birth_date),
            gender: new FormControl(this.profile.gender),
            first_name: new FormControl(this.profile.first_name),
            last_name: new FormControl(this.profile.last_name),
            nickname: new FormControl(this.profile.nickname),
            patronymic: new FormControl(this.profile.patronymic)
        });
    }

    public submit() {
        let formData = this.form.value;

        let profile: Profile = JSON.parse(JSON.stringify(this.profile));

        profile.first_name = formData['first_name']; 
       
        this.profileService.replaceInCache(this.profile, profile);
        
        this.profile = JSON.parse(JSON.stringify(profile));
    }

    ngOnChanges(){
        console.log("Change!");
    }
}
