import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


import {SidebarComponent} from "./Component/Sidebar";
import {SidebarService} from "./Service/SidebarService";
import {CommonModule} from "../Common/CommonModule";
import {NoticeModule} from "../Notice/NoticeModule";

@NgModule({
    imports: [
        CommonModule,
        NoticeModule,
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