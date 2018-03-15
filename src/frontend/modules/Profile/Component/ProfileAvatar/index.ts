import {Component, Input} from '@angular/core';
import {Profile, ProfileAvatarSizes} from "../../Entity/Profile";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";
import {ProfileService} from "../../Service/ProfileService";

@Component({
    selector: 'profile-avatar',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class ProfileAvatarComponent {
    @Input() profile: Profile;
    @Input() href: string;
    @Input() size: ProfileAvatarSizes = "medium";
    @Input() showMock: boolean = true;
    
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