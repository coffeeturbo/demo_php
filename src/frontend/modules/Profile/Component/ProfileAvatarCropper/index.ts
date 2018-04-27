import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Data} from "cropperjs";
import {Observable} from "rxjs";

import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileAvatarCropperHelper} from "./helper";
import {Config} from "../../../../app/config";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {
    @Input() disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

    public form: FormGroup = new FormGroup({
        src: new FormControl(null, null, this.validate.bind(this)),
        data: new FormControl(),
    });

    public cropperOptions = {
        viewMode: 1,
        center: false,
        guides: false,
        highlight: false,
        background: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        preview: '.avatar-preview',
        minCropBoxWidth: 100,
        minCropBoxHeight: 100,
        aspectRatio: 1,
    };

    constructor(public helper: ProfileAvatarCropperHelper) {
        helper.onChange.subscribe((data) => this.form.controls.src.setValue(data.src));
    }

    validate(srcControl: FormControl): Observable<ValidationErrors> {
        let image = new Image();

        if(srcControl.value)
            image.src = srcControl.value;

        return Observable.fromEvent(image, "load").map(() => {
            let constraints = Config.profile.constraints.avatar;
            let errors: ValidationErrors = {};
            let ratio = image.width / image.height;
            
            if(image.width > constraints.maxWidth || image.height > constraints.maxHeight) {
                errors.tooLarge = true;
            }

            if(image.width < constraints.minWidth || image.height < constraints.minHeight) {
                errors.tooSmall = true;
            }

            if(ratio > constraints.maxAspectRatio || ratio < constraints.minAspectRatio) {
                errors.invalidAspectRatio = true;
            }

            if(Object.keys(errors).length > 0) {
                return errors;
            }
        });
    }

    public submit(data: Data) {
        this.onCrop.emit({
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            image: this.helper.image
        });
    }
}