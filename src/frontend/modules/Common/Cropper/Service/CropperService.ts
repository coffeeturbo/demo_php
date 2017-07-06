import {EventEmitter, Injectable} from "@angular/core";
import * as Cropper from 'cropperjs';
import {CropperOptions, Data as CropperData} from "cropperjs";

/**
 * @TODO: Удалить:
 */
@Injectable()
export class CropperService {
    public enabled: boolean = false;
    
    private cropper: Cropper;
    private element: HTMLImageElement;
    private image: File;
    private options: CropperOptions = {
        viewMode: 1,
        center: false,
        guides: false,
        highlight: false,
        background: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        preview: '.preview',
        minCropBoxWidth: 100,
        minCropBoxHeight: 100,
        aspectRatio: 1
    };
    
    public onSelectImage = new EventEmitter<string>();
    
    
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
         }, 100);
    }
    
    public destroy() {
        if(this.enabled) {
            this.enabled = false;
            this.cropper.destroy();
            this.cropper = undefined;
            this.element.src = "";
        }
    }

    public getData(rounded: boolean = true): CropperData {
        if(this.cropper) {
            return this.cropper.getData(rounded);
        }
    }
    
    public getImage(): File {
        return this.image;
    }
    
    public readFile(image: File) {
        this.image = image;
        let reader = new FileReader();

        reader.readAsDataURL(this.image);

        reader.onloadend = (data: FileReaderEvent) => {
            this.onSelectImage.emit(data.target.result);
            // if (this.cropper) {
            //     this.replace(data.target.result);
            // } else {
            //     this.create(data.target.result);
            // }
        }
    }
}

// Fixing error: Property 'result' does not exist on type 'EventTarget'.
interface FileReaderEvent extends ProgressEvent {
    target: FileReader;
}