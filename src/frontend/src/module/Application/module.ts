import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import 'hammerjs';

import {appRoutes} from "./routes";


import {ApplicationComponent} from "./Component/Application/index";

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
