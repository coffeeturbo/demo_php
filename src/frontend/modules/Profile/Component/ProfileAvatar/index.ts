import {Component, HostBinding, Input} from '@angular/core';
import {Profile, ProfileAvatarSizes} from "../../Entity/Profile";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";
import {ProfileService} from "../../Service/ProfileService";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'profile-avatar',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class ProfileAvatarComponent {
    @Input() profile: Profile;
    @Input() href: any[] | string;
    @Input() size: ProfileAvatarSizes = "medium";
    @Input() showMock: boolean = true;
    @Input() round: boolean = true;
    
    @HostBinding('style.border-radius.%')
    get getBorderRadius() {
        return this.round ? 50 : 0;
    }
    
    constructor(
        public palleteService: PalleteService,
        public profileService: ProfileService
    ){}
    
    public hasAvatar(): boolean {
        return !!this.profile.avatar && this.profile.avatar.hasOwnProperty(this.size)
    }

    public getPath(): string {
        return this.profile.avatar[this.size].public_path;
    }
}