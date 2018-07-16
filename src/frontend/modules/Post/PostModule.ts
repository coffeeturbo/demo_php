import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DndModule} from "ng2-dnd";
import {TagInputModule} from "ngx-chips";
import {LinkyModule} from 'angular-linky';

import {PostRESTService} from "./Service/PostRESTService";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute";
import {PostFormRoute} from "./Route/PostFormRoute";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {PostCreateButtonComponent} from "./Component/PostCreateButton";
import {PostComponent} from "./Component/Post";
import {PostService} from "./Service/PostService";
import {PostTextFormat} from "./Pipe/PostTextFormat";
import {PostFormLoadingComponent} from "./Component/PostFormLoading";
import {CommentModule} from "../Comment/CommentModule";
import {PostCommentsResolver} from "./Service/PostCommentsResolver";
import {ShareModule} from "../Share/ShareModule";
import {CanDeactivatePostFormRoute} from "./Service/CanDeactivatePostFormRoute";
import {PostNotFoundComponent} from "./Component/PostNotFound";

@NgModule({
    imports: [
        TagInputModule,
        DndModule.forRoot(),
        LinkyModule,
        AttachmentModule,
        CommentModule,
        CommonModule,
        ShareModule,
        RouterModule
    ],
    declarations: [
        PostComponent,
        PostCreateButtonComponent,
        PostFormLoadingComponent,
        PostNotFoundComponent,
        PostRoute,
        PostFormRoute,
        PostTextFormat
    ],
    providers: [
        PostRESTService,
        PostService,
        PostResolver,
        PostCommentsResolver,
        PostTitleResolver,
        CanDeactivatePostFormRoute
    ],
    exports: [
        PostComponent,
        PostNotFoundComponent,
        PostCreateButtonComponent
    ]
})
export class PostModule {}