import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DndModule} from "ng2-dnd";
import {TagInputModule} from "ngx-chips";

import {PostRESTService} from "./Service/PostRESTService";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";
import {PostFormRoute} from "./Route/PostFormRoute/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {PostCreateButtonComponent} from "./Component/PostCreateButton/index";
import {PostComponent} from "./Component/Post/index";
import {PostCreatedPipe} from "./Pipe/PostCreatedPipe";
import {PostService} from "./Service/PostService";
import {PostTextFormat} from "./Pipe/PostTextFormat";

@NgModule({
    imports: [
        TagInputModule,
        DndModule.forRoot(),
        AttachmentModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        PostComponent,
        PostCreateButtonComponent,
        PostRoute,
        PostFormRoute,
        PostCreatedPipe,
        PostTextFormat
    ],
    providers: [
        PostRESTService,
        PostService,
        PostResolver,
        PostTitleResolver
    ],
    exports:[
        PostComponent,
        PostCreateButtonComponent
    ]
})
export class PostModule {}