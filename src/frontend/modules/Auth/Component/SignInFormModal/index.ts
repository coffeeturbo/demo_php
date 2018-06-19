import {Component, EventEmitter, Output, ViewChild} from "@angular/core";

import {AuthModals} from "../../Entity/AuthModals";
import {AuthModalsService} from "../../Service/AuthModalsService";
import {SignInFormComponent} from "../SignInForm";

@Component({
    selector: "sign-in-modal",
    templateUrl: "./template.pug"
})
export class SignInFormModalComponent {
    public AuthModals = AuthModals;

    @Output("on-close") onClose = new EventEmitter<void>();
    @ViewChild(SignInFormComponent) signInForm: SignInFormComponent;
    
    constructor(public authModalsService: AuthModalsService){}
}