import {NgModule} from "@angular/core";
import {AttachmentComponent} from "./Component/Attachment/index";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText/index";
import {CommonModule} from "../Common/CommonModule";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AttachmentComponent,
        AttachmentInputTextComponent
    ],
    providers: [
        AttachmentRESTService
    ],
    exports: [
        AttachmentComponent,
        AttachmentInputTextComponent
    ]
})
export class AttachmentModule {
}