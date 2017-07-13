import {AfterViewInit, Directive, ElementRef, Renderer2} from "@angular/core";
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[ng-detect-empty-input]'
})
export class EmptyInputDetectorDirective implements AfterViewInit {
    constructor(private el: ElementRef, private renderer: Renderer2, private formControl: NgControl) {}

    public ngAfterViewInit() {
        this.formControl.valueChanges
            .startWith(this.formControl.value)
            .subscribe((value?: any) => {
                if (value) {
                    this.renderer.removeClass(this.el.nativeElement, "ng-empty");
                } else {
                    this.renderer.addClass(this.el.nativeElement, "ng-empty");
                }
            })
        ;
    }
}