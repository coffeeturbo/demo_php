import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../Service/AuthService";

@Component({
    selector: 'sign-in-form',
    templateUrl: './template.pug',
    host: {'(window:keydown)': 'onKeyDown($event)'},
    styleUrls: ['./style.shadow.scss']
})

export class SignInFormComponent {

    @Input('show-controls') showControls: boolean = true;
    protected isPasswordHidden: boolean = true;
    public disabled: boolean = false;
    public fail: boolean = false;

    constructor(private authService: AuthService) {}

    public form: FormGroup = new FormGroup({
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        dont_remember: new FormControl(false)
    });

    private onKeyDown($event: KeyboardEvent) {
        if ($event.key === "Enter" && this.form.valid && !this.disabled) {
            this.submit()
        }
    }

    public submit() {
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
            .subscribe(null, () => {
                this.fail = true;
                this.form.controls.password.reset();
            });
    }
}