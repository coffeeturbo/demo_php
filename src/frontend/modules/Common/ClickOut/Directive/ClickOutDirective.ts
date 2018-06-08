import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOut]'
})
export class ClickOutDirective {
    constructor(private el: ElementRef) {}

    @Output() clickOut = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event, target): void {
        if (!target) return;

        const clickedInside = this.el.nativeElement.contains(target);
        if (!clickedInside) {
            this.clickOut.emit(event);
        }
    }
}