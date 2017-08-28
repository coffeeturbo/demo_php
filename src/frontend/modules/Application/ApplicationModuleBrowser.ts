import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
