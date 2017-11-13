import {NgModule} from "@angular/core";

import {CommonModule} from "../Common/CommonModule";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText/index";
import {AttachmentInputVideoComponent} from "./Component/AttachmentInputVideo/index";
import {AttachmentInputImageComponent} from "./Component/AttachmentInputImage/index";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent
    ],
    providers: [
        AttachmentRESTService
    ],
    exports: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent
    ]
})
export class AttachmentModule {
}