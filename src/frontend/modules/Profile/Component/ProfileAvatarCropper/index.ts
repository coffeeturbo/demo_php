import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CropperService} from "../../../Common/Cropper/Service/CropperService";
import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent implements AfterViewInit {

    @Input('disabled') disabled: boolean = false;
    @ViewChild('crop') cropImage: ElementRef;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

    constructor(public cropperService: CropperService) {}

    ngAfterViewInit() {
        this.cropperService.init(this.cropImage.nativeElement);
    }

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