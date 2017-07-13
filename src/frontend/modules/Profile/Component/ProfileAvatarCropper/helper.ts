import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ProfileAvatarCropperHelper {
    public src: string;
    public image: File;
    public onChange = new EventEmitter<{image: File, src: string}>();
    
    public setData(image: File, src: string) {
        this.image = image;
        this.src = src;
        this.onChange.emit({image, src});
    }
    
    public ready() {
        return !!this.src && !!this.image;
    }

    public destroy() {
        this.image = this.src = undefined;
    }
}