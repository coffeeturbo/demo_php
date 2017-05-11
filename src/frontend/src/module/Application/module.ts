import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {Http, RequestOptions, HttpModule, XHRBackend} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthConfig, AuthHttp} from "angular2-jwt";

import 'hammerjs';

import {appRoutes} from "./routes";


import {ApplicationComponent} from "./Component/Application/index";

import {RESTService} from "./Service/RESTService";


export function AuthHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

export function RESTServiceFacroty(backend: XHRBackend, options: RequestOptions, authHttp: AuthHttp) {
    return new RESTService(backend, options, authHttp);
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
        ApplicationComponent,
    ],
    bootstrap: [ApplicationComponent]
})
export class AppModule {}
