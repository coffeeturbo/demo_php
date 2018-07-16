import {Component, EventEmitter, Output, ViewChild} from "@angular/core";

import {SignInFormComponent} from "../SignInForm";

@Component({
    selector: "sign-in-modal",
    templateUrl: "./template.pug"
})
export class SignInFormModalComponent {
    @Output("on-close") onClose = new EventEmitter<void>();
    @ViewChild(SignInFormComponent) signInForm: SignInFormComponent;
}