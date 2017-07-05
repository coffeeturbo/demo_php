import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CropperService} from "../../../Common/Cropper/Service/CropperService";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {

    @Input('disabled') disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

    constructor(public cropperService: CropperService) {}

    submit() {
        let cropperData = this.cropperService.getData();
        let cropperImage = this.cropperService.getImage();

        this.onCrop.emit({
            x: cropperData.x,
            y: cropperData.y,
            width: cropperData.width,
            height: cropperData.height,
            image: cropperImage
        });
    }    
}