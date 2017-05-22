import {NgModule} from "@angular/core";
import {SettingsComponent} from "./Component/SettingsComponent/index";
import {SettingsModalComponent} from "./Component/SetingsModalComponent/index";
import {SettingsModalComponentService} from "./Service/SettingsModalComponentService";
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
        SettingsModalComponentService
    ],
    exports: [
        SettingsModalComponent
    ]
})
export class SettingsModule {} 