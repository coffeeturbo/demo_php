import {Injectable} from "@angular/core";

@Injectable()
export class ModalService {
    public isVisible: boolean = false;

    public show(): void {
        this.isVisible = true;
    }

    public hide(): void {
        this.isVisible = false;
    }
}