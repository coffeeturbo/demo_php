import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import 'hammerjs';

import {appRoutes} from "./routes";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {RESTService} from "../module/Application/Service/RESTService";
import {AutoFocusDirective} from "../module/UI/Directive/AutoFocusDirective";
import {ApplicationComponent} from "../module/Application/Component/Application/index";
import {LoaderComponent} from "../module/UI/Component/Loader/index";
import {ModalComponents} from "../module/UI/Component/Modal/index";
import {NotImplementedComponent} from "../module/UI/Component/NotImplemented/index";
import {SidebarComponent} from "../module/Sidebar/Component/Sidebar/index";
import {SignInFormComponent} from "../module/Auth/Component/SignInForm/index";
import {SignUpFormComponent} from "../module/Auth/Component/SignUpForm/index";
import {TooltipComponent} from "../module/UI/Component/Tooltip/index";
import {SocialButtonsComponent} from "../module/Auth/Component/SocialButtons/index";
import {FeedRoute} from "../module/Feed/Route/FeedRoute/index";
import {ForbiddenRoute} from "../module/Application/Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "../module/Application/Route/PageNotFoundRoute/index";
import {ProfileRoute} from "../module/Profile/Route/ProfileRoute/index";
import {SignInRoute} from "../module/Auth/Route/SignInRoute/index";
import {SignUpRoute} from "../module/Auth/Route/SignUpRoute/index";
import {AuthRESTService} from "../module/Auth/Service/AuthRESTService";
import {AuthService} from "../module/Auth/Service/AuthService";
import {CanActivateService} from "../module/Auth/Service/CanActivateService";
import {Device} from "../module/Application/Service/DeviceService";
import {StartupService} from "../module/Application/Service/StartupService";
import {SidebarService} from "../module/Sidebar/Service/SidebarService";
import {TranslatePipe} from "../module/Translate/Pipe/TranslationPipe";
import {TranslationService} from "../module/Translate/Service/TranslationService";
import {LocaleService} from "../module/Translate/Service/LocaleService";


export function AuthHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

export function RESTServiceFacroty(backend: XHRBackend, options: RequestOptions, authHttp: AuthHttp) {
    return new RESTService(backend, options, authHttp);
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.fakeload/*load*/();
}
 

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AutoFocusDirective,
        ApplicationComponent,
        LoaderComponent,
        ModalComponents,
        NotImplementedComponent,
        SidebarComponent,
        SignInFormComponent,
        SignUpFormComponent,
        TooltipComponent,
        SocialButtonsComponent,

        FeedRoute,
        ForbiddenRoute,
        PageNotFoundRoute,
        ProfileRoute,
        SignInRoute,
        SignUpRoute,
        
        TranslatePipe
    ],
    providers: [
        AuthRESTService,
        AuthService,
        CanActivateService,
        Device,
        RESTService,
        StartupService,
        SidebarService,
        TranslationService,
        LocaleService,
        {
            provide: AuthHttp,
            useFactory: AuthHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        {
            provide: RESTService,
            useFactory: RESTServiceFacroty,
            deps: [XHRBackend, RequestOptions, AuthHttp]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [ApplicationComponent]
})
export class AppModule {}
