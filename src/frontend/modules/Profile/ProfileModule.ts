import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../UI/UIModule";
import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";
import {ProfileRESTService} from "./Service/ProfileRESTService";
import {ProfileResolver} from "./Service/ProfileResolver";

@NgModule({
    imports:[
        UIModule,
        CommonModule
    ],
    declarations: [
        ProfileRoute,
        ProfileSettingsRoute
    ],
    providers: [
        ProfileRESTService,
        ProfileResolver
    ]
})
export class ProfileModule {} 