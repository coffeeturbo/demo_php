import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SettingsComponent} from "./Component/Settings/index";
import {SettingsModalComponent} from "./Component/SettingsModal/index";
import {SettingsModalService} from "./Service/SettingsModalService";
import {CommonModule} from "../Common/CommonModule";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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