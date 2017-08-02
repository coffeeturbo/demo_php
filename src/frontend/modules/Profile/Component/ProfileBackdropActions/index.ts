import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProfileBackdropActionsHelper} from "./helper";
import {ProfileBackdropCropperHelper} from "../ProfileBackdropCropper/helper";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../Entity/Profile";
import {BackdropPreset} from "../../Entity/BackdropPreset";
import {ProfileService} from "../../Service/ProfileService";

@Component({
    selector: 'backdrop-actions',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './spinner.shadow.scss']
})

export class ProfileBackdropActionsComponent implements OnInit {

    public profile: Profile;
    public deleteBackdropConfirmed = false;
    public isLoading: boolean = false;
    @Output() onChange = new EventEmitter<void>();
    
    constructor(
        private route: ActivatedRoute,
        public cropperHelper: ProfileBackdropCropperHelper,
        public profileService: ProfileService,
        public helper: ProfileBackdropActionsHelper
    ){}
    
    ngOnInit() {
        this.profile = {entity: this.route.snapshot.data["profile"]}.entity;
        this.isLoading = true;
            
        this.profileService.backdropPresets()
            .finally(() => this.isLoading = false)
            .subscribe()
    }
    
    public setPreset(preset: BackdropPreset) {
        this.isLoading = true;

        this.profileService.setBackdropPreset(this.profile, preset)
            .finally(() => this.isLoading = false)
            .subscribe((profile: Profile) => this.sync(profile))
        
    }
    
    public deleteBackdrop() {
        this.isLoading = true;
        
        if(!this.deleteBackdropConfirmed) {
            this.deleteBackdropConfirmed = true;
        } else {
            this.profileService.deleteBackdrop(this.profile)
                .finally(() => this.isLoading = false)
                .subscribe((profile: Profile) => this.sync(profile))
        }
    }
    
    public sync(profile) {
        this.helper.hide();
        this.route.snapshot.data["profile"] = profile;
        this.onChange.emit();
    }
}