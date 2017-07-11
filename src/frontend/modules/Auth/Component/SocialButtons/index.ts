import {Component, EventEmitter, Output} from "@angular/core";

import {AuthService} from "../../Service/AuthService";
import {TokenResponse} from "../../Http/Response/TokenResponse";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";

@Component({
    selector: "social-buttons",
    templateUrl: "./template.pug",
    styleUrls: ["style.shadow.scss"]
})

export class SocialButtonsComponent {
    @Output("onConnect") onConnect = new EventEmitter<void>();

    /**
     * @TODO Сделать один event вместо 3х и хэндлить так:
     * event.subscribe(
     *  (onSuccess)=>{...}
     *  (onFail)=>{...}
     *  (onComplete)=>{...}
     *  )
     */
    @Output("onSuccess") onSuccess = new EventEmitter<TokenResponse>();
    @Output("onComplete") onComplete = new EventEmitter<void>();
    @Output("onFail") onFail = new EventEmitter<ResponseFailure>();

    constructor(private authService: AuthService) {}

    public connectVK(): void {
        this.onConnect.emit();
        this.authService.connectVK()
            .finally(() => this.onComplete.emit())
            .subscribe(
                (data: TokenResponse) => this.onSuccess.emit(data),
                (error: ResponseFailure) => this.onFail.emit(error)
            );
    }

    public connectFacebook(): void {
        this.onConnect.emit();
        this.authService.connectFacebook()
            .finally(() => this.onComplete.emit())
            .subscribe(
                (data: TokenResponse) => this.onSuccess.emit(data),
                (error: ResponseFailure) => this.onFail.emit(error)
            );
    }

}