import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Data} from "cropperjs";

import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileAvatarCropperHelper} from "./helper";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {
    @Input('disabled') disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

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
    
    constructor(public helper: ProfileAvatarCropperHelper) {}
    
    public submit() {
        this.onCrop.emit({
            x: this.data.x,
            y: this.data.y,
            width: this.data.width,
            height: this.data.height,
            image: this.helper.image
        });
    }    
}