import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {UIModule} from "../UI/UIModule";
import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";
import {ProfileRESTService} from "./Service/ProfileRESTService";
import {ProfileResolver} from "./Service/ProfileResolver";
import {ProfileService} from "./Service/ProfileService";
import {ProfileTitleResolver} from "./Service/ProfileTitleResolver";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UIModule
    ],
    declarations: [
        ProfileRoute,
        ProfileSettingsRoute
    ],
    providers: [
        ProfileRESTService,
        ProfileService,
        ProfileResolver,
        ProfileTitleResolver
    ]
})
export class ProfileModule {} 