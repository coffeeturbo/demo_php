import {Injectable} from "@angular/core";
import * as Cropper from 'cropperjs';
import {CropperOptions} from "cropperjs";

@Injectable()
export class CropperService {
    public enabled: boolean = false;
    
    private cropper: Cropper;
    private element: HTMLImageElement;
    private input: HTMLInputElement;
    private options: CropperOptions = {
        viewMode: 1,
        center: false,
        guides: false,
        highlight: false,
        background: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        aspectRatio: 1
    };
    constructor() {
        this.input = <HTMLInputElement>document.createElement("INPUT");
        this.input.setAttribute("type", "file");
        this.input.setAttribute("accept", "image/*");

        this.input.onchange = (e: any) => {
            this.readFile(e.target.files[0]);
        }
    }
    
    public init(element: HTMLImageElement) {
        this.element = element;
    }
    
    public create(src: string) {
        this.element.src = src;
        this.enabled = true;
        this.cropper = new Cropper(this.element, this.options);
    }
    
    public replace(src: string) {
        this.enabled = true;
         setTimeout(()=>{
            this.cropper.replace(src);
         },0);
    }
    
    public destroy() {
        if(this.enabled) {
            this.enabled = false;
            this.cropper.destroy();
            this.element.src = "";
            this.input.value = ""
        }
    }

    public browseFile() {
        this.input.click();
    }
    
    public readFile(file: File) {
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = (data: FileReaderEvent) => {
            if (this.cropper) {
                this.replace(data.target.result);
            } else {
                this.create(data.target.result);
            }
        }
    }
}

// Fixing error: Property 'result' does not exist on type 'EventTarget'.
interface FileReaderEvent extends ProgressEvent {
    target: FileReader;
}