import {Injectable} from "@angular/core";
@Injectable()
export class SettingsModalComponentService {
    public isVisible: boolean = false;
    
    public show() {
        this.isVisible = true;
    }
    
    public hide() {
        this.isVisible = true;
    }
}