import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CommonModule} from "../Common/CommonModule";
import {ProfileRoute} from "./Route/ProfileRoute";
import {ProfileSettingsRoute} from "./Route/ProfileSettingsRoute";
import {ProfileRESTService} from "./Service/ProfileRESTService";
import {ProfileResolver} from "./Service/ProfileResolver";
import {ProfileService} from "./Service/ProfileService";
import {ProfileTitleResolver} from "./Service/ProfileTitleResolver";
import {ProfileDateCreatedPipe} from "./Pipe/ProfileDateCreatedPipe";
import {ProfileAvatarRoute} from "./Route/ProfileAvatarRoute";
import {ProfileAvatarCropperComponent} from "./Component/ProfileAvatarCropper";
import {ProfileAvatarCropperHelper} from "./Component/ProfileAvatarCropper/helper";
import {ProfileBirthdayPipe} from "./Pipe/ProfileBirthdayPipe";
import {ProfileBackdropCropperComponent} from "./Component/ProfileBackdropCropper";
import {ProfileBackdropCropperHelper} from "./Component/ProfileBackdropCropper/helper";
import {ProfileDropdownComponent} from "./Component/ProfileDropdown";
import {ProfileBackdropActionsHelper} from "./Component/ProfileBackdropActions/helper";
import {ProfileBackdropActionsComponent} from "./Component/ProfileBackdropActions";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileFeedRequestResolver} from "./Service/ProfileFeedRequestResolver";
import {ProfileAvatarComponent} from "./Component/ProfileAvatar";
import {AuthModule} from "../Auth/AuthModule";
import {ProfileNotFoundComponent} from "./Component/ProfileNotFound";
import {ProfileSubscribeComponent} from "./Component/ProfileSubscribe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FeedModule,
        AuthModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileAvatarCropperComponent,
        ProfileBackdropCropperComponent,
        ProfileBackdropActionsComponent,
        ProfileSubscribeComponent,
        ProfileDropdownComponent,
        ProfileAvatarComponent,
        ProfileRoute,
        ProfileSettingsRoute,
        ProfileAvatarRoute,
        ProfileNotFoundComponent,
        ProfileDateCreatedPipe,
        ProfileBirthdayPipe
    ],
    providers: [
        ProfileRESTService,
        ProfileService,
        
        ProfileResolver,
        ProfileTitleResolver,
        ProfileFeedRequestResolver,
        
        ProfileAvatarCropperHelper,
        ProfileBackdropCropperHelper,
        ProfileBackdropActionsHelper
    ],
    exports: [
        ProfileDropdownComponent,
        ProfileAvatarComponent
    ]
})
export class ProfileModule {
} 