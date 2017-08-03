import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from "@angular/core";

@Directive({
    selector: '[autosize]'
})

export class AutoSizeDirective implements OnInit {
    
    @HostBinding('style.height.px') height: number;

    private divNode: HTMLElement = this.renderer.createElement("div");
    
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    
    ngOnInit() {
        this.el.nativeElement.parentElement.appendChild(this.divNode);

        this.divNode.style.cssText = window.getComputedStyle(this.el.nativeElement).cssText;
        this.divNode.style.overflow = "visible";
        this.divNode.style.height = "auto";
        this.divNode.style.position = "absolute";
        this.divNode.style.left = "-9999px";
    }
    
    ngAfterViewInit() {
        setTimeout(()=>this.sync(), 50);
    }
    
    @HostListener('input') 
    public sync() {
        this.divNode.innerText = this.el.nativeElement.value;
        this.height = null;
        this.el.nativeElement.style.overflow = null;

        if(this.divNode.innerText) { //&& this.divNode.offsetHeight < this.maxHeight
            this.divNode.innerText = this.divNode.innerText + " ";
            this.height = this.divNode.offsetHeight;
            this.el.nativeElement.style.overflow = "visible";
        }
    }
}