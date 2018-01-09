import {NgModule} from "@angular/core";
import {CommentComponent} from "./Component/Comment/index";
import {RouterModule} from "@angular/router";
import {CommonModule} from "../Common/CommonModule";
import {CommentCreatedPipe} from "./Pipe/CommentCreatedPipe";
import {CommentFormComponent} from "./Component/CommentForm/index";
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
        CommentCreatedPipe,
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