import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'attachment-input-image',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => AttachmentInputImageComponent),
        multi: true
    }]
})

export class AttachmentInputImageComponent implements ControlValueAccessor  {
    propagateChange:any = () => {};
    @Input() id: string;
    @Input('value') _value: any = "";

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
}