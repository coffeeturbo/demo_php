import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {TranslateModule} from "../Translate/TranslateModule";

import {SidebarComponent} from "./Component/Sidebar/index";
import {SidebarService} from "./Service/SidebarService";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        SidebarComponent
    ],
    providers: [
        SidebarService
    ],
    exports: [
        SidebarComponent
    ]
})
export class SidebarModule {} 