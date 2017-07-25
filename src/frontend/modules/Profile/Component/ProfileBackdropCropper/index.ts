import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProfileBackdropCropperHelper} from "./helper";
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {BackdropUploadRequest} from "../../Http/Request/BackdropUploadRequest";
import {Data} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Config} from "../../../../app/config";

@Component({
    selector: 'profile-backdrop-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileBackdropCropperComponent implements OnDestroy {
    @Input() disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<BackdropUploadRequest>();
    public constraints = Config.profile.constraints.backdrop;

    public form: FormGroup = new FormGroup({
        src: new FormControl(null, null, this.validate.bind(this)),
        data: new FormControl(),
    });

    public cropperOptions = {
        viewMode: 3,
        center: false,
        guides: false,
        highlight: false,
        modal: false,
        background: false,
        dragMode: "move",
        autoCropArea: 1,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
    };

    constructor(public helper: ProfileBackdropCropperHelper) {
        helper.onChange.subscribe((data) => this.form.controls.src.setValue(data.src));
    }
    
    ngOnDestroy() {
        this.helper.destroy()
    }

    public validate(srcControl: FormControl): Observable<ValidationErrors> {
        let avatar = new Image();
        avatar.src = srcControl.value;

        return Observable.fromEvent(avatar, "load").map(() => {
            let constraints = this.constraints;
            let errors: ValidationErrors = {};

            if(avatar.width > constraints.maxWidth || avatar.height > constraints.maxHeight) {
                errors.tooLarge = true;
            }

            if(avatar.width < constraints.minWidth || avatar.height < constraints.minHeight) {
                errors.tooSmall = true;
            }

            if(Object.keys(errors).length > 0) {
                return errors;
            }
        });
    }

    public submit(data: Data) {
        this.onCrop.emit({
            y: data.y,
            image: this.helper.image
        });
    }
}