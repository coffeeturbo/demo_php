import {Component, HostListener} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../Service/AuthService";
import {AuthModalsService} from "../../Service/AuthModalsService";
import {AuthModals} from "../../Entity/AuthModals";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";
import {HttpCodes} from "../../../Application/Entity/HttpCodes";

@Component({
    selector: "sign-in-form",
    templateUrl: "./template.pug",
    styleUrls: ["style.shadow.scss"],
})
export class SignInFormComponent {

    public AuthModals = AuthModals;
    public isPasswordHidden: boolean = true;
    public disabled: boolean = false;
    public fail: boolean = false;
    public form: FormGroup = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        dont_remember: new FormControl(false)
    });

    constructor(private authService: AuthService, public authModalsService: AuthModalsService) {}

    @HostListener('document:keydown.enter')
    public submit(): void {
        if (this.form.valid && !this.disabled) {
            let formData = this.form.value;
            this.disabled = true;
            this.fail = false;

            this.authService
                .signIn({
                    username: formData.username,
                    password: formData.password,
                    dont_remember: formData.dont_remember
                })
                .finally(() => this.disabled = false)
                .subscribe(null, (error: ResponseFailure) => {
                    this.fail = true;
                    switch (error.code) {
                        case HttpCodes.Unauthorized:
                            this.form.controls.password.reset();
                            this.form.setErrors({"denied": true}); 
                        break;
                    }
                });
        }
    }
}