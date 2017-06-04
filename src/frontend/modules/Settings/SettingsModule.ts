import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SettingsComponent} from "./Component/Settings/index";
import {SettingsModalComponent} from "./Component/SettingsModal/index";
import {SettingsModalService} from "./Service/SettingsModalService";
import {UIModule} from "../UI/UIModule";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        UIModule
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