import {NgModule} from "@angular/core";

import {NoticeService} from "./Service/NoticeService";
import {CommonModule} from "../Common/CommonModule";
import {NotificationsComponent} from "./Component/Notifications";
import {NoticeComponent} from "./Component/Notice";

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations: [
        NotificationsComponent,
        NoticeComponent
    ],
    providers: [
        NoticeService
    ],
    exports: [
        NotificationsComponent
    ]
})
export class NoticeModule {} 