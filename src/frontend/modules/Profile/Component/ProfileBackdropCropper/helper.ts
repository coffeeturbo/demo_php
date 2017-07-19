import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ProfileBackdropCropperHelper {
    public src: string;
    public image: File;
    public onChange = new EventEmitter<{ image: File, src: string }>();

    public setData(image: File, src: string): void {
        this.image = image;
        this.src = src;
        this.onChange.emit({image, src});
    }

    public ready(): boolean {
        return !!this.src && !!this.image;
    }

    public disabled(): boolean {
        return !this.ready();
    }

    public destroy(): void {
        this.image = this.src = undefined;
    }
}