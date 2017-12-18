import {NgModule} from "@angular/core";
import {CommentComponent} from "./Component/Comment/index";
import {RouterModule} from "@angular/router";
import {CommonModule} from "../Common/CommonModule";
import {CommentCreatedPipe} from "./Pipe/CommentCreatedPipe";
import {CommentFormComponent} from "./Component/CommentForm/index";
import {AttachmentModule} from "../Attachment/AttachmentModule";

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
    exports: [
        CommentComponent,
        CommentFormComponent,
    ]
})
export class CommentModule {} 