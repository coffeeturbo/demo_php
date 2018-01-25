import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: 'attachment-text'
})

export class AttachmentTextComponent implements AfterViewInit {
    @Input() text;
    
    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.el.nativeElement.innerHTML = this.text.replace(/\n/g, "<br/>");
    }
}