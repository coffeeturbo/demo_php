import {Injectable} from "@angular/core";

@Injectable()
export class ModalService {
    public isVisible: boolean = false;

    public show() {
        this.isVisible = true;
    }

    public hide() {
        this.isVisible = false;
    }
}