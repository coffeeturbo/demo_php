import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
    selector: '[material-input]'
})
export class MaterialInputDirective implements AfterViewInit {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('change')
    public ngAfterViewInit() {
        if(this.el.nativeElement.value) {
            this.renderer.removeClass(this.el.nativeElement, "material-input-empty");
        } else {
            this.renderer.addClass(this.el.nativeElement, "material-input-empty");
        }
    }
    
}