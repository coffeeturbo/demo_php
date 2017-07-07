import {Injectable} from "@angular/core";

@Injectable()
export class ProfileAvatarCropperHelper {
    public src: string;
    public image: File;
    
    public ready() {
        return !!this.src && !!this.image;
    }

    public destroy() {
        this.image = this.src = undefined;
    }
}