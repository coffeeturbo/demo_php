import {NgModule} from "@angular/core";

import {PostRESTService} from "./Service/PostRESTService";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentModule} from "../Attachment/AttachmentModule";

@NgModule({
    imports: [
        AttachmentModule,
        CommonModule
    ],
    declarations: [
        PostRoute
    ],
    providers:[
        PostRESTService,
        PostResolver,
        PostTitleResolver
    ]
})
export class PostServerModule {
}