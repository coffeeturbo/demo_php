import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {CropperOptions, Data} from "cropperjs";
import * as Cropper from 'cropperjs';

@Directive({
    selector: '[cropper]'
})
export class CropperDirective implements OnChanges {
    private cropper: Cropper;
    @Input("src") src: string;
    @Input("options") options: CropperOptions;
    
    @Output("onDataChange") onDataChange = new EventEmitter<Data>();

    private defaultOptions: CropperOptions = {
        ready: () => this.onDataChange.emit(this.cropper.getData()),
        cropend: () => this.onDataChange.emit(this.cropper.getData())
    };
    
    constructor(private el: ElementRef) {}
    
    ngOnChanges() {
        this.el.nativeElement.src = this.src;

        if(this.cropper instanceof Cropper) {
            this.cropper.replace(this.el.nativeElement.src);
        } else {
            this.cropper = new Cropper(this.el.nativeElement, Object.assign(this.defaultOptions, this.options));
        }
    }
}