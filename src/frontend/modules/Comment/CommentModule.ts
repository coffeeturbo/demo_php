import {NgModule} from "@angular/core";
import {CommentComponent} from "./Component/Comment";
import {RouterModule} from "@angular/router";
import {CommonModule} from "../Common/CommonModule";
import {CommentFormComponent} from "./Component/CommentForm";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {CommentRESTService} from "./Service/CommentRESTService";
import {CommentService} from "./Service/CommentService";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AttachmentModule
    ],
    declarations: [
        CommentFormComponent,
        CommentComponent
    ],
    providers: [
        CommentRESTService,
        CommentService
    ],
    exports: [
        CommentComponent,
        CommentFormComponent,
    ]
})
export class CommentModule {} 