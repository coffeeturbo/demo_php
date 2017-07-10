import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CommonModule} from "../Common/CommonModule";
import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";
import {ProfileRESTService} from "./Service/ProfileRESTService";
import {ProfileResolver} from "./Service/ProfileResolver";
import {ProfileService} from "./Service/ProfileService";
import {ProfileTitleResolver} from "./Service/ProfileTitleResolver";
import {ProfileDateCreatedPipe} from "./Pipe/ProfileDateCreatedPipe";
import {ProfileAvatarRoute} from "./Route/ProfileAvatarRoute/index";
import {ProfileAvatarCropperComponent} from "./Component/ProfileAvatarCropper/index";
import {ProfileAvatarCropperHelper} from "./Component/ProfileAvatarCropper/helper";
import {ProfileBirthdayPipe} from "./Pipe/ProfileBirthdayPipe";
import {DatePipe} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileAvatarCropperComponent,
        ProfileRoute,
        ProfileSettingsRoute,
        ProfileAvatarRoute,
        ProfileDateCreatedPipe,
        ProfileBirthdayPipe
    ],
    providers: [
        ProfileRESTService,
        ProfileService,
        ProfileResolver,
        ProfileTitleResolver,
        ProfileAvatarCropperHelper
    ]
})
export class ProfileModule {
} 