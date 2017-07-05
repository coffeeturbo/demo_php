import {AfterViewInit, Directive, ElementRef} from "@angular/core";

import {CropperService} from "../Service/CropperService";

@Directive({
    selector: '[cropper]'
})
export class FocusDirective implements AfterViewInit {
    constructor(
        private cropperService: CropperService,
        private el: ElementRef
    ) {}

    ngAfterViewInit() {
        this.cropperService.init(this.el.nativeElement);
    }
}