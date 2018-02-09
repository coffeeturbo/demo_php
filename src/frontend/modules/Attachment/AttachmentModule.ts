import {NgModule} from "@angular/core";

import {CommonModule} from "../Common/CommonModule";
import {AttachmentInputTextComponent} from "./Component/AttachmentInputText";
import {AttachmentInputVideoComponent} from "./Component/AttachmentInputVideo";
import {AttachmentInputImageComponent} from "./Component/AttachmentInputImage";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";
import {AttachmentVideoYoutubeComponent} from "./Component/AttachmentVideoYoutube";
import {AttachmentTextComponent} from "./Component/AttachmentText";

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