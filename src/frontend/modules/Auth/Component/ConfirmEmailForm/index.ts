import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthRESTService} from "../../Service/AuthRESTService";
import {AuthService} from "../../Service/AuthService";
import {TokenService} from "../../Service/TokenService";
import {TokenResponse} from "../../Http/Response/TokenResponse";
import {NoticeService} from "../../../Notice/Service/NoticeService";
import {NoticeType} from "../../../Notice/Entity/NoticeType";

@Component({
    selector: "confirm-email-form",
    templateUrl: "./template.pug"
})
export class ConfirmEmailFormComponent {

    @Output("onSuccess") onSuccess = new EventEmitter<null>();
    public form: FormGroup = new FormGroup({
        verification_code: new FormControl(null, Validators.required),
    });

    constructor(
        private authRESTSerice: AuthRESTService,
        private authService: AuthService,
        private tokenService: TokenService,
        private noticeService: NoticeService
    ) {}

    submit() {
        this.authRESTSerice.confirmEmail(this.form.value.verification_code)
            .flatMap(() => this.authService.refreshToken({"refresh_token": this.tokenService.getRefreshToken()}))
            .subscribe((response: TokenResponse) => {
                this.authService.addTokenExpirationSchedule();
                // @TODO: Move text in to config
                this.noticeService.addNotice("Your email confirmed. Now you can voting and much more!", NoticeType.Success);
                this.onSuccess.emit();
            })
        ;
    }
}