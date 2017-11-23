import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";

import {Profile} from "../../Entity/Profile";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";
import {ProfileAvatarCropperHelper} from "../../Component/ProfileAvatarCropper/helper";
import {ProfileBackdropCropperHelper} from "../../Component/ProfileBackdropCropper/helper";
import {BackdropUploadRequest} from "../../Http/Request/BackdropUploadRequest";
import {ProfileBackdropActionsHelper} from "../../Component/ProfileBackdropActions/helper";
import {Feed} from "../../../Feed/Entity/Feed";
import {FeedService} from "../../../Feed/Service/FeedService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute {

    public profile: Profile;
    public feed: Feed;
    public disabled: boolean = false;

    constructor(
        private route: ActivatedRoute, 
        private translationService: TranslationService,
        public profileService: ProfileService, 
        public palleteService: PalleteService, 
        public avatarHelper: ProfileAvatarCropperHelper,
        public backdropHelper: ProfileBackdropCropperHelper,
        public backdropActionsHelper: ProfileBackdropActionsHelper,
        public feedService: FeedService
    ) {
        this.route.data.subscribe(data => {
            this.profile = data.profile;
            this.feed = data.profileFeed;

            if(this.profileService.hasAvatar(this.profile)) {
                // Preload fullsize avatar
                (new Image()).src = this.profile.avatar['origin'].public_path;
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
    
    private isLoading: boolean = false;
    private isFeedEnd: boolean = false;
    public loadFeed(cursor: number) {
        if(this.isLoading || this.isFeedEnd) 
            return;

        this.isLoading = true;
        this.feedService
            .get(10, {profile: this.profile.id, cursor: cursor})
            .finally(() => this.isLoading = false)
            .subscribe((feed) => {
                this.isFeedEnd = feed.length == 0;
                this.feed = this.feed.concat(feed)
            })
        ;
    }
}