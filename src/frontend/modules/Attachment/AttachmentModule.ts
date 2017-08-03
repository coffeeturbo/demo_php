import {NgModule} from "@angular/core";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText/index";
import {CommonModule} from "../Common/CommonModule";
import {AttachmentInputVideoComponent} from "./Component/AttachmentInputVideo/index";
import {AttachmentInputImageComponent} from "./Component/AttachmentInputImage/index";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent
    ],
    exports: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent
    ]
})
export class AttachmentModule {
}