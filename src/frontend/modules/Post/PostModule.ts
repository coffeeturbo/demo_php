import {NgModule} from "@angular/core";
import {PostRESTService} from "./Service/PostRESTService";
import {PostComponent} from "./Component/Post/index";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";
import {AddPostRoute} from "./Route/AddPostRoute/index";
import {CommonModule} from "../Common/CommonModule";
import {DragulaModule} from "ng2-dragula";
import {AttachmentModule} from "../Attachment/AttachmentModule";

@NgModule({
    imports: [
        DragulaModule,
        AttachmentModule,
        CommonModule
    ],
    declarations: [
        PostComponent,
        PostRoute,
        AddPostRoute
    ],
    providers:[
        PostRESTService,
        PostResolver,
        PostTitleResolver
    ]
})
export class PostModule {}