import {
    AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output,
    ViewChild
} from '@angular/core';
import {AsyncValidator, ControlValueAccessor, FormControl, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR} from "@angular/forms";

import {Attachment} from "../../Entity/Attachment";
import {AttachmentVideo} from "../../Entity/AttachmentVideo";
import {AttachmentGetVideoLinkRequest} from "../../Http/Request/AttachmentGetVideoLinkRequest";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {ValidationErrors} from "@angular/forms/src/directives/validators";
import {AttachmentService} from "../../Service/AttachmentService";

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
    @Output() onParseVideoLink = new EventEmitter<Attachment<AttachmentVideo>>();
    @ViewChild('input') public input: ElementRef;
    public attachmentVideo: Attachment<AttachmentVideo>;
    public disabled: boolean = false;
    
    constructor(private attachmentService: AttachmentService) {}

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

    validate(control: FormControl): Observable<ValidationErrors | null> {
        this.disabled = true;
        
        return this.attachmentService
            .parseVideoLink(<AttachmentGetVideoLinkRequest>{url: this.value})
            .do(attachmentVideo => {
                this.attachmentVideo = attachmentVideo;
                this.onParseVideoLink.emit(this.attachmentVideo);
            })
            .map(() => null)
            .finally(() => this.disabled = false)
            .catch(() => Observable.of(<ValidationErrors>{invalidLink: true}))
        ;
    }
}