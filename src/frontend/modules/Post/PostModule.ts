import {NgModule} from "@angular/core";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {DragulaModule} from "ng2-dragula";
// import {TagInputModule} from "ngx-chips";

import {PostRESTService} from "./Service/PostRESTService";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";
// import {PostFormRoute} from "./Route/PostFormRoute/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentModule} from "../Attachment/AttachmentModule";

@NgModule({
    imports: [
        // TagInputModule,
        // BrowserAnimationsModule,
        // DragulaModule,
        AttachmentModule,
        CommonModule
    ],
    declarations: [
        PostRoute,
        // PostFormRoute
    ],
    providers:[
        PostRESTService,
        PostResolver,
        PostTitleResolver
    ]
})
export class PostModule {}