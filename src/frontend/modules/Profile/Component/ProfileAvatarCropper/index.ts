import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Data} from "cropperjs";

import {AvatarUploadRequest} from "../../Http/Request/AvatarUploadRequest";
import {ProfileAvatarCropperHelper} from "./helper";
import {Config} from "../../../../app/config";
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'profile-avatar-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileAvatarCropperComponent {
    @Input('disabled') disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<AvatarUploadRequest>();

    public form: FormGroup;
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

    private constraints = Config.profile.constraints.avatar;

    ngOnInit() {
        this.form = new FormGroup({
            avatar: new FormControl("", null, this.validate.bind(this)),
            // @TODO: validate data too, remove redudant this.data
        });
    }
    
    validate(avatarControl: FormControl): Observable<ValidationErrors> {
        let avatar = new Image();
        avatar.src = avatarControl.value;

        return Observable.fromEvent(avatar, "load").map(() => {
            let errors: ValidationErrors = {};
            let ratio = avatar.width / avatar.height;
            
            if(avatar.width > this.constraints.maxWidth || avatar.width < this.constraints.minWidth) {
                errors.invalidWidth = true;
            }

            if(avatar.height > this.constraints.maxHeight || avatar.height < this.constraints.minHeight) {
                errors.invalidHeight = true;
            }

            if(ratio > this.constraints.maxAspectRatio || ratio < this.constraints.minAspectRatio) {
                errors.invalidAspectRatio = true;
            }

            if(Object.keys(errors).length > 0) {
                return errors;
            }
        });
    }
    
    constructor(public helper: ProfileAvatarCropperHelper) {
        helper.onChange.subscribe((data) => {
            this.form.controls.avatar.setValue(data.src);
        });
    }
    
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