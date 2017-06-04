import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


import {SidebarComponent} from "./Component/Sidebar/index";
import {SidebarService} from "./Service/SidebarService";
import {CommonModule} from "../Common/CommonModule";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
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
export class SidebarModule {
} 