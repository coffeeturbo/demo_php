import {Component, ElementRef, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'attachment-input-text',
    templateUrl: './template.pug',
    providers: [{
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => AttachmentInputTextComponent),
        multi: true
    }]
})

export class AttachmentInputTextComponent implements ControlValueAccessor, OnChanges, OnInit {
    propagateChange:any = () => {};
    @Input() id: string;
    @Input('value') _value = "";
    @Input() placeholder = "Enter text";
    @Input() focus: boolean = false;

    constructor(private elementRef: ElementRef) {}
    
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.propagateChange(value);
    }
    
    ngOnInit() {
        if (this.focus) {
            this.elementRef.nativeElement.querySelector('textarea').focus();
        }
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