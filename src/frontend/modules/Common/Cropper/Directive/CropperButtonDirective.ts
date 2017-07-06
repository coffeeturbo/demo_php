import {Directive, HostListener} from "@angular/core";

import {CropperService2} from "../Service/CropperService2";

@Directive({
    selector: '[cropper-browse]'
})
export class CropperButtonDirective {
    private input: HTMLInputElement = <HTMLInputElement>document.createElement("INPUT");
    
    constructor(private cropperService: CropperService2) {
        this.input.setAttribute("type", "file");
        this.input.setAttribute("accept", "image/*");
        this.input.onchange = (e: HTMLInputEvent) => {
            this.cropperService.setImage(e.target.files[0]);
            this.input.value = ""
        }
    }
    
    @HostListener('click') 
    public browseFile() {
        this.input.click();
    }
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}