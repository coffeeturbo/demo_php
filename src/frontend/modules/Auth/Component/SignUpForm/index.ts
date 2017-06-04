import {Component, Input} from "@angular/core";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {AuthService} from "../../Service/AuthService";
import {Config} from "../../../../app/config";


@Component({
    selector: "sign-up-form",
    templateUrl: "./template.pug",
    host: {"(window:keydown)": "onKeyDown($event)"},
    styleUrls: ["../SignInForm/style.shadow.scss"]
})

export class SignUpFormComponent {
    public config = Config;

    @Input("show-controls") showControls: boolean = true;
    protected isPasswordHidden: boolean = true;
    public disabled: boolean = false;
    public fail: boolean = false;

    public form: FormGroup = new FormGroup({
        email: new FormControl("", Validators.email),
        password: new FormControl("", Validators.pattern(new RegExp(this.config.account.constraints.password.match))),
        password_confirm: new FormControl("", Validators.required)
    }, (form: FormGroup) => {
        if (form.value.password !== form.value.password_confirm) {
            return <ValidationErrors>{not_equal_passwords: true};
        }
    });

    constructor(private authService: AuthService) {}

    private onKeyDown($event: KeyboardEvent): void {
        if ($event.key === "Enter" && this.form.valid && !this.disabled) {
            this.submit()
        }
    }

    public submit(): void {
        let formData = this.form.value;
        this.disabled = true;
        this.fail = false;

        this.authService
            .signUp({
                email: formData.email,
                password: formData.password,
            })
            .finally(() => this.disabled = false)
            .subscribe(null, () => this.fail = true);
    }
}