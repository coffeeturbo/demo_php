import { Directive, OnInit, ElementRef } from '@angular/core';
import {Device} from "../../Application/Service/DeviceService";

@Directive({
    selector: '[auto-focus]'
})
export class AutoFocusDirective implements OnInit {

    constructor(private elementRef: ElementRef) { };

    ngOnInit(): void {
        if(!Device.isMobile())
            this.elementRef.nativeElement.focus();
    }

}