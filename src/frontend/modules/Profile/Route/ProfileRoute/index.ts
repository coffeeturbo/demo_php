import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Profile} from "../../Entity/Profile";
import {CropperService} from "../../../Common/Cropper/Service/CropperService";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileService} from "../../Service/ProfileService";
import {PalleteService} from "../../../Common/Pallete/Service/PalleteService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileRoute implements OnInit, AfterViewInit {

    public profile: Profile;
    public disabled: boolean = false;
    @ViewChild('crop') cropImage: ElementRef;

    constructor(
        private route: ActivatedRoute, 
        private profileService: ProfileService, 
        public palleteService: PalleteService, 
        public cropperService: CropperService
    ) {}

    ngOnInit() {
        this.profile = this.route.snapshot.data["profile"];
    }
    
    ngAfterViewInit() {
        this.cropperService.init(this.cropImage.nativeElement);
    }

    public getProfileColor() {
        return this.palleteService.encode(this.profile.name);
    }
    
    public getProfileFirstLetters() {
        return this.profile.name
            .split(" ")
            .slice(0,2)
            .map(item => item.charAt(0).toUpperCase())
            .join(" ")
        ;
    }
    
    submit() {
        this.disabled = true;
        let cropperData = this.cropperService.getData();
        let cropperImage = this.cropperService.getImage();
        let avatarUploadRequest = <AvatarUploadRequest>{
            x: cropperData.x,
            y: cropperData.y,
            width: cropperData.width,
            height: cropperData.height,
            image: cropperImage
        };
        
        this.profileService.uploadAvatar(this.profile, avatarUploadRequest)
            .finally(() => this.disabled = false)
            .subscribe((profile) => {
                this.profile = profile;
                this.cropperService.destroy();
            })
        ;
    }
}