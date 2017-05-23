import {NgModule} from "@angular/core";
import {SettingsComponent} from "./Component/Settings/index";
import {SettingsModalComponent} from "./Component/SettingsModal/index";
import {SettingsModalService} from "./Service/SettingsModalService";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule} from "../Translate/TranslateModule";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UIModule} from "../UI/UIModule";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
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
export class SettingsModule {} 