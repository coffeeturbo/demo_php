import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {Config} from "../../../../app/config";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";
import {AuthService} from "../../Service/AuthService";
import {NoticeService} from "../../../Notice/Service/NoticeService";
import {NoticeType} from "../../../Notice/Entity/NoticeType";
import {TranslationService} from "@angular-addons/translate/index";

@Component({
    selector: 'recover-password-by-email-form',
    templateUrl: './template.pug',
})

export class RecoverPasswordByEmailFormComponent {
    @Input() code: string;
    @Input() step: RecoverPasswordByEmailStep = RecoverPasswordByEmailStep.sendEmail;
    public RecoverPasswordByEmailStep = RecoverPasswordByEmailStep;
    public config = Config;
    public disabled: boolean = false;
    public fail: boolean = false;
    public isPasswordHidden: boolean = true;

    public sendEmailForm: FormGroup = new FormGroup({
        url: new FormControl("/"),
        email: new FormControl(null, Validators.required),
    });

    public changePasswordForm: FormGroup = new FormGroup({
        code: new FormControl("", Validators.required),
        password: new FormControl("", Validators.pattern(new RegExp(this.config.account.constraints.password.match))),
        password_confirm: new FormControl("", Validators.required)
    }, (form: FormGroup) => {
        if (form.value.password !== form.value.password_confirm) {
            return <ValidationErrors>{not_equal_passwords: true};
        }
    });

    constructor(private authService: AuthService, private noticeService: NoticeService, private translationService: TranslationService) {
    }

    ngOnInit() {
        if (typeof window != 'undefined') {
            this.sendEmailForm.controls.url.setValue(window.location.origin + '/recover-password/')
        }
        this.changePasswordForm.controls.code.setValue(this.code);
    }

    sendEmail() {
        this.disabled = true;
        this.fail = false;
        this.authService.recoverPasswordByEmail(this.sendEmailForm.value)
            .finally(() => this.disabled = false)
            .subscribe(() => {
                    this.step = RecoverPasswordByEmailStep.changePassword;
                }, (error: ResponseFailure) => {
                    switch (error.code) {
                        default :
                            this.sendEmailForm.setErrors({"unknown": true});
                            break;
                    }

                    this.fail = true;
                    console.log(`Error ${error.code}. ${error.message}. Try again.`); // @TODO better handle errors
                }
            );
    }

    changePassword() {
        this.disabled = true;
        this.fail = false;
        this.authService.recoverPasswordByEmailConfirm(this.changePasswordForm.value)
            .finally(() => this.disabled = false)
            .subscribe(() => {
                    this.noticeService.addNotice(this.translationService.translate("Password changed successfully! For your convenience, we have already authorized you."), NoticeType.Success)
                }, (error: ResponseFailure) => {
                    this.fail = true;
                    switch (error.code) {
                        default :
                            this.changePasswordForm.setErrors({"unknown": true});
                            break;
                    }
                    console.log(`Error ${error.code}. ${error.message}. Try again.`); // @TODO better handle errors
                }
            )
    }
}

export enum RecoverPasswordByEmailStep {
    sendEmail,
    changePassword,
}