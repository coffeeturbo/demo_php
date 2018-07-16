import {Component, EventEmitter, Output, ViewChild} from "@angular/core";

import {SignUpFormComponent} from "../SignUpForm";

@Component({
    selector: "sign-up-modal",
    templateUrl: "./template.pug"
})
export class SignUpFormModalComponent {
    @Output("on-close") onClose = new EventEmitter<void>();
    @ViewChild(SignUpFormComponent) signUpForm: SignUpFormComponent;
}