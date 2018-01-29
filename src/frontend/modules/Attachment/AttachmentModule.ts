import {NgModule} from "@angular/core";

import {CommonModule} from "../Common/CommonModule";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText/index";
import {AttachmentInputVideoComponent} from "./Component/AttachmentInputVideo/index";
import {AttachmentInputImageComponent} from "./Component/AttachmentInputImage/index";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";
import {AttachmentVideoYoutubeComponent} from "./Component/AttachmentVideoYoutube/index";
import {AttachmentTextComponent} from "./Component/AttachmentText/index";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent,

        AttachmentVideoYoutubeComponent,
        AttachmentTextComponent
    ],
    providers: [
        AttachmentRESTService
    ],
    exports: [
        AttachmentInputTextComponent,
        AttachmentInputVideoComponent,
        AttachmentInputImageComponent,
        
        AttachmentVideoYoutubeComponent,
        AttachmentTextComponent
    ]
})
export class AttachmentModule {
}