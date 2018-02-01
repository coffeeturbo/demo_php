import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {CommonModule} from "../Common/CommonModule";

import {SignInFormComponent} from "./Component/SignInForm/index";
import {SignUpFormComponent} from "./Component/SignUpForm/index";
import {SocialButtonsComponent} from "./Component/SocialButtons/index";

import {SignInRoute} from "./Route/SignInRoute/index";
import {SignUpRoute} from "./Route/SignUpRoute/index";

import {AuthRESTService} from "./Service/AuthRESTService";
import {AuthService} from "./Service/AuthService";
import {CanActivateService} from "./Service/CanActivateService";
import {OAuthService} from "./Service/OAuthService";
import {TokenService, TokenServiceConfig} from "./Service/TokenService";
import {Config} from "../../app/config";

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
    ],
    providers: [
        AuthRESTService,
        AuthService,
        OAuthService,
        CanActivateService,
        TokenService,
        {
            provide: TokenServiceConfig,
            useValue: {
                tokenKey: Config.auth.token_key,
                refreshTokenKey: Config.auth.refresh_token_key
            }
        }
    ]
})
export class AuthModule {}