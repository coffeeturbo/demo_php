import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as Cookies from 'universal-cookie';
import {MetrikaModule} from "ng-yandex-metrika";

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";
import {Config} from "../../app/config";


@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        BrowserAnimationsModule,
        BrowserTransferStateModule,
        ApplicationModule,
        MetrikaModule.forRoot(
            Config.applications.metrika,
        )
    ],
    providers: [
        {
            provide: 'Cookies',
            useValue: new Cookies(document.cookie)
        },
    ]
})
export class ApplicationModuleBrowser {}
