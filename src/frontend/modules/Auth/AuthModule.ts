import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {CommonModule} from "../Common/CommonModule";

import {SignInFormComponent} from "./Component/SignInForm";
import {SignUpFormComponent} from "./Component/SignUpForm";
import {SocialButtonsComponent} from "./Component/SocialButtons";

import {SignInRoute} from "./Route/SignInRoute";
import {SignUpRoute} from "./Route/SignUpRoute";

import {AuthRESTService} from "./Service/AuthRESTService";
import {AuthService} from "./Service/AuthService";
import {CanActivateService} from "./Service/CanActivateService";
import {OAuthService} from "./Service/OAuthService";
import {TokenService, TokenServiceConfig} from "./Service/TokenService";
import {Config} from "../../app/config";
import {ConfirmEmailFormComponent} from "./Component/ConfirmEmailForm";
import {SignInFormModalComponent} from "./Component/SignInFormModal";
import {AuthModalsService} from "./Service/AuthModalsService";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SignInFormComponent,
        SignUpFormComponent,
        SignInRoute,
        SignUpRoute,
        SocialButtonsComponent,
        ConfirmEmailFormComponent,
        SignInFormModalComponent
    ],
    providers: [
        AuthRESTService,
        AuthService,
        OAuthService,
        CanActivateService,
        TokenService,
        AuthModalsService,
        {
            provide: TokenServiceConfig,
            useValue: {
                tokenKey: Config.auth.token_key,
                refreshTokenKey: Config.auth.refresh_token_key
            }
        }
    ],
    exports: [
        SignInFormModalComponent,
        ConfirmEmailFormComponent
    ]
})
export class AuthModule {}