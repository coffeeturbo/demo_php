import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


import {SidebarComponent} from "./Component/Sidebar";
import {SidebarService} from "./Service/SidebarService";
import {CommonModule} from "../Common/CommonModule";
import {NoticeModule} from "../Notice/NoticeModule";
import {ProfileModule} from "../Profile/ProfileModule";
import {SidebarSubscriptionsProfilesComponent} from "./Component/SidebarSubscriptionsProfiles";

@NgModule({
    imports: [
        CommonModule,
        NoticeModule,
        ProfileModule,
        RouterModule
    ],
    declarations: [
        SidebarComponent,
        SidebarSubscriptionsProfilesComponent
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