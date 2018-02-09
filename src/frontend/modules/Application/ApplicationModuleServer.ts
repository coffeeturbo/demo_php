import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {ApplicationModule} from "./ApplicationModule";
import {ApplicationComponent} from "./Component/Application";

@NgModule({
    bootstrap: [ ApplicationComponent ],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'application'
        }),
        ServerModule,
        ServerTransferStateModule,
        ApplicationModule
    ]
})
export class ApplicationModuleServer {}
