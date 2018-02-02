import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as Cookies from 'universal-cookie';

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";


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
            provide: 'Cookies',
            useValue: new Cookies(document.cookie)
        },
    ]
})
export class ApplicationModuleBrowser {}
