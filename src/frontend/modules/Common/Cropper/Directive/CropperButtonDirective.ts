import {Directive, EventEmitter, HostListener, Output, Renderer2} from "@angular/core";
import {Observable} from "rxjs";

@Directive({
    selector: '[cropper-browse]'
})
export class CropperButtonDirective {
    private input: HTMLInputElement = this.renderer.createElement("input");
    @Output('onChange') onChange = new EventEmitter<{image: File, src: string}>();
    
    constructor(private renderer: Renderer2) {
        renderer.setAttribute(this.input, "type", "file");
        renderer.setAttribute(this.input, "accept", "image/*");
        
        Observable.fromEvent(this.input, "change")
            .map((e: HTMLInputEvent) => e.target.files[0])
            .subscribe((image: File) => {
                this.readImage(image)
                    .map((e: FileReaderEvent) => e.target.result)
                    .subscribe(src => this.onChange.emit({image, src}))
                ;
            })
        ;
    }
    
    @HostListener('click') 
    public browseFile() {
        this.input.click();
    }

    public readImage(image: File) : Observable<FileReaderEvent>
    {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        return Observable.fromEvent(reader, "loadend");
    }
    
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

interface FileReaderEvent extends ProgressEvent {
    target: FileReader;
}