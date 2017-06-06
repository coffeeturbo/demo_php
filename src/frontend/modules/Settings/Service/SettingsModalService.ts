import {Injectable} from "@angular/core";
import {Modal} from "@angular-addons/modal";

@Injectable()
export class SettingsModalService implements Modal 
{
    public isVisible: boolean = false;

    public show(): void {
        this.isVisible = true;
    }

    public hide(): void {
        this.isVisible = false;
    }
}