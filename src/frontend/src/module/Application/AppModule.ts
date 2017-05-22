import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import 'hammerjs';

import {appRoutes} from "../../app/routes";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {RESTService} from "./Service/RESTService";
import {ApplicationComponent} from "./Component/Application/index";
import {ForbiddenRoute} from "./Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "./Route/PageNotFoundRoute/index";
import {Device} from "./Service/DeviceService";
import {StartupService} from "./Service/StartupService";
import {AuthModule} from "../Auth/AuthModule";
import {UIModule} from "../UI/UIModule";
import {TranslateModule} from "../Translate/TranslateModule";
import {SidebarModule} from "../Sidebar/SidebarModule";
import {SettingsModule} from "../Settings/SettingsModule";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileModule} from "../Profile/ProfileModule";


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
        RouterModule.forRoot(appRoutes),

        AuthModule,
        FeedModule,
        ProfileModule,
        SettingsModule,
        SidebarModule,
        TranslateModule,
        UIModule,
    ],
    declarations: [
        ApplicationComponent,
        ForbiddenRoute,
        PageNotFoundRoute,
    ],
    providers: [
        Device,
        RESTService,
        StartupService,
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
