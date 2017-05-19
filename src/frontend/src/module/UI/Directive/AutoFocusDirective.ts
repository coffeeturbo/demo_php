import { Directive, OnInit, ElementRef } from '@angular/core';
import {Device} from "../../Application/Service/DeviceService";

@Directive({
    selector: '[auto-focus]'
})
export class AutoFocusDirective implements OnInit {

    constructor(private elementRef: ElementRef, private device: Device) { };

    ngOnInit(): void {
        if(!this.device.isMobile())
            this.elementRef.nativeElement.focus();
    }

}