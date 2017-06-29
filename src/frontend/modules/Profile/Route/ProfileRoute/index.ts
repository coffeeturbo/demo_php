import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Profile} from "../../Entity/Profile";
import {CropperService} from "../../../Common/Cropper/Service/CropperService";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute implements OnInit {

    public profile: Profile;
    public avatarPath: string = 'https://pbs.twimg.com/profile_images/378800000796578930/bb2119f37f717b0bc551923f7fdf3d9f_400x400.jpeg';

    constructor(
        private route: ActivatedRoute, 
        private profileService: ProfileService, 
        public cropperService: CropperService
    ) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
    }
    
    @ViewChild('crop') cropImage: ElementRef;
    
    ngAfterViewInit() {
        this.cropperService.init(this.cropImage.nativeElement);
    }
    
    submit() {
        let cropperData = this.cropperService.getData();
        let cropperImage = this.cropperService.getImage();
        let avatarUploadRequest = <AvatarUploadRequest>{
            x: cropperData.x,
            y: cropperData.y,
            width: cropperData.width,
            height: cropperData.height,
            image: cropperImage
        };
        
        this.profileService.uploadAvatar(this.profile, avatarUploadRequest).subscribe((profile)=>{
            console.log(profile);
        })
    }
}

