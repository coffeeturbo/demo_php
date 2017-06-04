import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";

import "hammerjs";

import {appRoutes} from "../../app/routes";
import "../../assets/styles/index.scss";

import {ApplicationComponent} from "./Component/Application/index";
import {ForbiddenRoute} from "./Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "./Route/PageNotFoundRoute/index";
import {RESTService} from "./Service/RESTService";
import {StartupService} from "./Service/StartupService";

import {AuthModule} from "../Auth/AuthModule";
import {CommonModule} from "../Common/CommonModule";
import {SidebarModule} from "../Sidebar/SidebarModule";
import {SettingsModule} from "../Settings/SettingsModule";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileModule} from "../Profile/ProfileModule";
import {RouteHelperService} from "./Service/RouteHelperService";
import {ApplicationLogoComponent} from "./Component/ApplicationLogo/index";
import {ApplicationLoadingBarComponent} from "./Component/ApplicationLoadingBar/index";

export function AuthHttpServiceFactory(http: Http, options: RequestOptions): AuthHttp {
    return new AuthHttp(new AuthConfig(), http, options);
}

export function RESTServiceFacroty(backend: XHRBackend, options: RequestOptions, authHttp: AuthHttp): RESTService {
    return new RESTService(backend, options, authHttp);
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.init();
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        AuthModule,
        FeedModule,
        ProfileModule,
        SettingsModule,
        SidebarModule,
        CommonModule,
    ],
    declarations: [
        ApplicationComponent,
        ApplicationLogoComponent,
        ApplicationLoadingBarComponent,
        ForbiddenRoute,
        PageNotFoundRoute,
    ],
    providers: [
        RESTService,
        StartupService,
        RouteHelperService,
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
