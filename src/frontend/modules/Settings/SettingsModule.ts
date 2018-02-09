import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SettingsComponent} from "./Component/Settings";
import {SettingsModalComponent} from "./Component/SettingsModal";
import {SettingsModalService} from "./Service/SettingsModalService";
import {CommonModule} from "../Common/CommonModule";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SettingsComponent,
        SettingsModalComponent
    ],
    providers: [
        SettingsModalService
    ],
    exports: [
        SettingsModalComponent
    ]
})
export class SettingsModule {
} 