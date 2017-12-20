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
import {ProfileBackdropCropperComponent} from "./Component/ProfileBackdropCropper/index";
import {ProfileBackdropCropperHelper} from "./Component/ProfileBackdropCropper/helper";
import {ProfileDropdownComponent} from "./Component/ProfileDropdown/index";
import {ProfileBackdropActionsHelper} from "./Component/ProfileBackdropActions/helper";
import {ProfileBackdropActionsComponent} from "./Component/ProfileBackdropActions/index";
import {ProfileFeedResolver} from "./Service/ProfileFeedResolver";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileFeedRequestResolver} from "./Service/ProfileFeedRequestResolver";
import {ProfileAvatarComponent} from "./Component/ProfileAvatar/index";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FeedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileAvatarCropperComponent,
        ProfileBackdropCropperComponent,
        ProfileBackdropActionsComponent,
        ProfileDropdownComponent,
        ProfileAvatarComponent,
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
        ProfileFeedResolver,
        ProfileFeedRequestResolver,
        
        ProfileAvatarCropperHelper,
        ProfileBackdropCropperHelper,
        ProfileBackdropActionsHelper
    ],
    exports: [
        ProfileDropdownComponent
    ]
})
export class ProfileModule {
} 