import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {CropperService2} from "../../../Common/Cropper/Service/CropperService2";
import {Data} from "cropperjs";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {
    @Input('disabled') disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();
    public image: File;
    public data: Data;
    
    public cropperOptions = {
        viewMode: 1,
        center: false,
        guides: false,
        highlight: false,
        background: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        preview: '.preview',
        minCropBoxWidth: 100,
        minCropBoxHeight: 100,
        aspectRatio: 1,
    };
    
    constructor(public cropperService: CropperService2) {
        this.cropperService.onSetImage.subscribe((image: File) => {
            this.image = image;
        });
    }
    
    public submit() {
        this.onCrop.emit({
            x: this.data.x,
            y: this.data.y,
            width: this.data.width,
            height: this.data.height,
            image: this.image
        });
    }    
}