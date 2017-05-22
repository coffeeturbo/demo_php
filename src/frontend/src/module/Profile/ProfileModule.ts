import {NgModule} from "@angular/core";

import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";

@NgModule({
    declarations: [
        ProfileRoute,
        ProfileSettingsRoute
    ]
})
export class ProfileModule {} 