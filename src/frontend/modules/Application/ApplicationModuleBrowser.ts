import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";
import {CookieService} from "./Service/CookieService";


@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        BrowserAnimationsModule,
        BrowserTransferStateModule,
        ApplicationModule
    ],
    providers: [
        {
            provide: CookieService,
            useValue: new CookieService(document.cookie)
        }
    ]
})
export class ApplicationModuleBrowser {}
