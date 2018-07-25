import {Component, EventEmitter, HostListener, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../Service/AuthService";

@Component({
    selector: "confirm-email-form",
    templateUrl: "./template.pug"
})
export class ConfirmEmailFormComponent {

    @Output("onSuccess") onSuccess = new EventEmitter<null>();
    public disabled: boolean = false;
    public form: FormGroup = new FormGroup({
        verification_code: new FormControl(null, Validators.required),
    });


    constructor(private authService: AuthService) {}

    @HostListener('document:keyup.enter')
    submit() {
        if (!this.form.valid && !this.disabled) return;
        this.disabled = true;
        
        this.authService.confirmEmail(this.form.value.verification_code)
            .finally(() => this.disabled = false)
            .subscribe(() => this.onSuccess.emit());
    }
}