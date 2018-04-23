import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnChanges, ViewChild} from '@angular/core';
import {AsyncValidator, ControlValueAccessor, FormControl, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

import {Attachment} from "../../Entity/Attachment";
import {AttachmentVideo} from "../../Entity/AttachmentVideo";
import {AttachmentGetVideoLinkRequest} from "../../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentRESTService} from "../../Service/AttachmentRESTService";

@Component({
    selector: 'attachment-input-video',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR, 
            useExisting: forwardRef(() => AttachmentInputVideoComponent),
            multi: true
        },
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => AttachmentInputVideoComponent),
            multi: true,
        }
    ]
})

export class AttachmentInputVideoComponent implements ControlValueAccessor, AsyncValidator, OnChanges, AfterViewInit {
    propagateChange:any = () => {};
    @Input() id: string;
    @Input('value') _value = "";
    @Input() focus: boolean = false;
    @ViewChild('input') public input: ElementRef;
    public attachmentVideo: Attachment<AttachmentVideo>;
    public disabled: boolean = false;
    public linkHasError: boolean = false;
    
    constructor(private attachmentRESTService: AttachmentRESTService) {}

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.propagateChange(value);
    }
    
    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    ngAfterViewInit() {
        if (this.focus) {
            this.input.nativeElement.focus()
        }
    }

    ngOnChanges() {
        this.propagateChange(this.value);
    }
    
    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    onInput(value): void {
        this.value = value;
    }

    validate(control: FormControl) {
        return new Promise((resolve) => {
            if(/https?:\/\/.*/.test(control.value)) {
                this.linkHasError = false;
                this.disabled = true;
                this.attachmentRESTService
                    .parseVideoLink(<AttachmentGetVideoLinkRequest>{url: this.value})
                    .finally(() => this.disabled = false)
                    .subscribe(
                        attachmentGetVideoLinkResponse => {
                            this.attachmentVideo = attachmentGetVideoLinkResponse;
                            resolve(null)
                        },
                        () => resolve({invalidLink: true})
                    )
                ;
            } else {
                resolve({invalidLink: true});
            }
        });
    }
}