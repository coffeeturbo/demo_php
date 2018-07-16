import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../Service/AuthService";

@Component({
    selector: "confirm-email-form",
    templateUrl: "./template.pug"
})
export class ConfirmEmailFormComponent {

    @Output("onSuccess") onSuccess = new EventEmitter<null>();
    public form: FormGroup = new FormGroup({
        verification_code: new FormControl(null, Validators.required),
    });

    constructor(private authService: AuthService) {}

    submit() {
        this.authService.confirmEmail(this.form.value.verification_code).subscribe(() => this.onSuccess.emit());
    }
}