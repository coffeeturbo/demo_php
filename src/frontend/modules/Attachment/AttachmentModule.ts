import {NgModule} from "@angular/core";
import {AttachmentComponent} from "./Component/Attachment/index";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentInputVideoComponent} from "./Component/AttachmentInputVideo/index";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AttachmentComponent,
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent
    ],
    providers: [
        AttachmentRESTService
    ],
    exports: [
        AttachmentComponent,
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent
    ]
})
export class AttachmentModule {
}