import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";

@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        BrowserAnimationsModule,
        ApplicationModule
    ]
})
export class ApplicationModuleBrowser {}
