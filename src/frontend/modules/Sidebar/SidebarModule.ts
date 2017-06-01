import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {TranslateModule} from "../Translate/TranslateModule";

import {SidebarComponent} from "./Component/Sidebar/index";
import {SidebarService} from "./Service/SidebarService";

@NgModule({
    imports: [
        CommonModule,
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