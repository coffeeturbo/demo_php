import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";

@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        ApplicationModule
    ]
})
export class ApplicationModuleBrowser {}
