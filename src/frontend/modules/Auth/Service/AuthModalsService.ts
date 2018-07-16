import {Injectable} from "@angular/core";
import {AuthModals, AuthModalsType} from "../Entity/AuthModals";

@Injectable()
export class AuthModalsService {
    private modals: AuthModalsType = {};
    
    constructor() {
        this.init();
    }

    public show(modal: AuthModals): void {
        this.reset();
        this.modals[modal] = true;
    }

    public hide(modal: AuthModals): void {
        this.modals[modal] = false;
    }

    public isVisible(modal: AuthModals): boolean {
        return this.modals[modal];
    }
    
    public reset() {
        this.init();
    }
    
    private init() {
        for (let authModalsKey in AuthModals) {
            this.modals[authModalsKey] = false;
        }
    }
}
