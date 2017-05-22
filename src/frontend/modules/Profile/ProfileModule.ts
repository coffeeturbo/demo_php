import {NgModule} from "@angular/core";

import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";
import {UIModule} from "../UI/UIModule";

@NgModule({
    imports:[
        UIModule
    ],
    declarations: [
        ProfileRoute,
        ProfileSettingsRoute
    ]
})
export class ProfileModule {} 