import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {Observable} from "rxjs";
import {CropperOptions, Data} from "cropperjs";
import * as Cropper from 'cropperjs';

@Directive({
    selector: '[cropper]'
})
export class CropperDirective implements OnChanges {
    @Input() src: string;
    @Input() options: CropperOptions;
    @Output("onChange") onChange = new EventEmitter<Data>();

    private cropper: Cropper;
    private defaultOptions: CropperOptions = {
        ready: () => this.onChange.emit(this.cropper.getData()),
        cropend: () => this.onChange.emit(this.cropper.getData())
    };
    
    constructor(private el: ElementRef) {
        Observable
            .fromEvent(el.nativeElement, "load")
            .subscribe(() => {
                if(this.cropper) {
                    this.cropper.replace(el.nativeElement.src);
                } else {
                    this.cropper = new Cropper(el.nativeElement, {...this.defaultOptions, ...this.options});
                }
            })
        ;
    }

    ngOnChanges() {
        this.el.nativeElement.src = this.src;
    }
}