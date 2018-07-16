import {Component, EventEmitter, Output, ViewChild} from "@angular/core";

import {RecoverPasswordByEmailFormComponent} from "../RecoverPasswordByEmailForm";

@Component({
    selector: "recover-password-by-email-form-modal",
    templateUrl: "./template.pug"
})
export class RecoverPasswordByEmailFormModalComponent {
    @Output("on-close") onClose = new EventEmitter<void>();
    @ViewChild(RecoverPasswordByEmailFormComponent) recoverPasswordByEmailFormComponent: RecoverPasswordByEmailFormComponent;
}