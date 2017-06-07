import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        CanActivateService
    ]
})
export class AuthModule {}