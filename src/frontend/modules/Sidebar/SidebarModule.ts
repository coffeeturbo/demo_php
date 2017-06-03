import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


import {SidebarComponent} from "./Component/Sidebar/index";
import {SidebarService} from "./Service/SidebarService";
import {UIModule} from "../UI/UIModule";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UIModule
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