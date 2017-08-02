import {Injectable} from "@angular/core";
import {Modal} from "@angular-addons/modal";

@Injectable()
export class ProfileBackdropActionsHelper implements Modal {
    isVisible: boolean = !false;
    
    public show() {
        this.isVisible = true;
    }

    public hide() {
        this.isVisible = false;
    }
}