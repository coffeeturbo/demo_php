import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TagRoute} from "./Route/TagRoute";
import {PostModule} from "../Post/PostModule";
import {CommonModule} from "../Common/CommonModule";
import {TagTitleResolver} from "./Service/TagTitleResolver";
import {TagRESTService} from "./Service/TagRESTService";
import {TagFeedRequestResolver} from "./Service/TagFeedRequestResolver";

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        PostModule
    ],
    declarations: [
        TagRoute
    ],
    providers: [
        TagTitleResolver,
        TagFeedRequestResolver,
        TagRESTService
    ]
})
export class TagModule {} 