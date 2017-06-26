import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CommonModule} from "../Common/CommonModule";
import {ProfileRoute} from "./Route/ProfileRoute/index";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute/index";
import {ProfileRESTService} from "./Service/ProfileRESTService";
import {ProfileResolver} from "./Service/ProfileResolver";
import {ProfileService} from "./Service/ProfileService";
import {ProfileTitleResolver} from "./Service/ProfileTitleResolver";
import {ImageCropperModule} from "ng2-img-cropper";
import {AvatarCropperModalService} from "./Service/AvatarCropperModalService";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule
    ],
    declarations: [
        ProfileRoute,
        ProfileSettingsRoute
    ],
    providers: [
        AvatarCropperModalService,
        ProfileRESTService,
        ProfileService,
        ProfileResolver,
        ProfileTitleResolver
    ]
})
export class ProfileModule {
} 