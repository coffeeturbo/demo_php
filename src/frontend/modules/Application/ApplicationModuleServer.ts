import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application/index";

@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        ServerModule,
        ApplicationModule
    ]
})
export class ApplicationModuleServer {}
