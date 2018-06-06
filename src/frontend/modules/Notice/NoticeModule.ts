import {NgModule} from "@angular/core";

import {NoticeService} from "./Service/NoticeService";
import {CommonModule} from "../Common/CommonModule";
import {NotificationsComponent} from "./Component/Notifications";

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations: [
        NotificationsComponent
    ],
    providers: [
        NoticeService
    ],
    exports: [
        NotificationsComponent
    ]
})
export class NoticeModule {} 