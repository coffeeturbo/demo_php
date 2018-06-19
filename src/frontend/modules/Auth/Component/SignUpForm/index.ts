import {Component, HostListener, Input} from "@angular/core";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {AuthService} from "../../Service/AuthService";
import {Config} from "../../../../app/config";
import {AuthModals} from "../../Entity/AuthModals";
import {AuthModalsService} from "../../Service/AuthModalsService";


@Component({
    selector: "sign-up-form",
    templateUrl: "./template.pug",
    styleUrls: ['../SignInForm/style.shadow.scss']
})

export class SignUpFormComponent {
    public config = Config;
    public AuthModals = AuthModals;

    public isPasswordHidden: boolean = true;
    public disabled: boolean = false;
    public fail: boolean = false;
    public form: FormGroup = new FormGroup({
        name: new FormControl("", Validators.required),
        email: new FormControl("", Validators.email),
        password: new FormControl("", Validators.pattern(new RegExp(this.config.account.constraints.password.match))),
        password_confirm: new FormControl("", Validators.required)
    }, (form: FormGroup) => {
        if (form.value.password !== form.value.password_confirm) {
            return <ValidationErrors>{not_equal_passwords: true};
        }
    });

    constructor(public authModalsService: AuthModalsService, private authService: AuthService) {}

    @HostListener('document:keyup.enter')
    public submit(): void {
        if (this.form.valid && !this.disabled) {
            let formData = this.form.value;
            this.disabled = true;
            this.fail = false;

            this.authService
                .signUp({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
                .finally(() => this.disabled = false)
                .subscribe(null, error => {
                    switch (error.code) {
                        case 409 : this.form.setErrors({"conflict": true}); break;        
                    }
                    
                    this.fail = true;
                });
        }
    }
}