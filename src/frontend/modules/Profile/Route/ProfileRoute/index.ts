import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";

import {Profile} from "../../Entity/Profile";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";
import {ProfileAvatarCropperHelper} from "../../Component/ProfileAvatarCropper/helper";
import {ProfileBackdropCropperHelper} from "../../Component/ProfileBackdropCropper/helper";
import {BackdropUploadRequest} from "../../Http/Request/BackdropUploadRequest";
import {ProfileBackdropActionsHelper} from "../../Component/ProfileBackdropActions/helper";
import {Feed} from "../../../Feed/Entity/Feed";
import {FeedService} from "../../../Feed/Service/FeedService";
import {PlatformService} from "../../../Application/Service/PlatformService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute {

    public profile: Profile;
    public feed: Feed;
    public disabled: boolean = false;
    public isLoading: boolean = false;
    public isFeedEnd: boolean = false;

    constructor(
        private route: ActivatedRoute, 
        private translationService: TranslationService,
        public profileService: ProfileService, 
        public avatarHelper: ProfileAvatarCropperHelper,
        public backdropHelper: ProfileBackdropCropperHelper,
        public backdropActionsHelper: ProfileBackdropActionsHelper,
        public feedService: FeedService,
        public pl: PlatformService
    ) {
        this.route.data.subscribe(data => {
            this.profile = data.profile;
            this.feed = data.profileFeed;

            // Preload fullsize avatar
            if(this.profile.avatar && pl.isPlatformBrowser()) {
                (new Image()).src = this.profile.avatar.origin.public_path;
            }
        });
    }

    public update() {
        this.profile = this.route.snapshot.data["profile"];
    }
    
    public translate(string: string) {
        return this.translationService.translate(string);
    }
    
    public uploadAvatar(avatarUploadRequest: AvatarUploadRequest) {
        this.disabled = true;
        this.profileService.uploadAvatar(this.profile, avatarUploadRequest)
            .finally(() => this.disabled = false)
            .subscribe((profile: Profile) => {
                this.profile = this.route.snapshot.data["profile"] = profile;
                this.avatarHelper.destroy();
            })
        ;
    }
    
    public uploadBackdrop(backdropUploadRequest: BackdropUploadRequest) {
        this.disabled = true;
        this.profileService.uploadBackdrop(this.profile, backdropUploadRequest)
            .finally(() => this.disabled = false)
            .subscribe((profile: Profile) => {
                this.profile = this.route.snapshot.data["profile"] = profile;
                this.backdropHelper.destroy();
            })
        ;
    }
    
    public loadFeed(cursor: number) {
        
        if(this.isLoading || this.isFeedEnd) 
            return;

        let limit = 10;

        this.isLoading = true;
        
        this.feedService
            .get(limit, {profile: this.profile.id, cursor: cursor})
            .finally(() => this.isLoading = false)
            .subscribe((feed: Feed) => {
                this.isFeedEnd = feed.length < limit;
                this.feed = this.feed.concat(feed)
            })
        ;
    }
}