import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Data} from "@angular/router";
import {Observable} from "rxjs";

import {BackdropUploadRequest} from "../../Http/Request/BackdropUploadRequest";
import {ProfileBackdropCropperHelper} from "./helper";
import {Config} from "../../../../app/config";

@Component({
    selector: 'profile-backdrop-cropper',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileBackdropCropperComponent implements OnDestroy {
    @Input() disabled: boolean = false;
    @Output('onCrop') onCrop = new EventEmitter<BackdropUploadRequest>();

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
        let image = new Image();

        if(srcControl.value)
            image.src = srcControl.value;

        return Observable.fromEvent(image, "load").map(() => {
            let constraints = Config.profile.constraints.backdrop;
            let errors: ValidationErrors = {};

            if(image.width > constraints.maxWidth || image.height > constraints.maxHeight) {
                errors.tooLarge = true;
            }

            if(image.width < constraints.minWidth || image.height < constraints.minHeight) {
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