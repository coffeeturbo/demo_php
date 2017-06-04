import {NgModule} from "@angular/core";
import {AttachmentComponent} from "./Component/Attachment/index";
import {AttachmentRESTService} from "./Service/AttachmentRESTService";

@NgModule({
    imports: [
    ],
    declarations: [
        AttachmentComponent
    ],
    providers: [
        AttachmentRESTService
    ],
    exports: [
        AttachmentComponent
    ]
})
export class AttachmentModel {
}