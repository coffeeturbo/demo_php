import {NgModule} from "@angular/core";

import {NoticeService} from "./Service/NoticeService";
import {CommonModule} from "../Common/CommonModule";
import {NoticeRoute} from "./Route/NoticeRoute";
import {NotificationsComponent} from "./Component/Notifications";

@NgModule({
    imports:[
        CommonModule,
    ],
    declarations: [
        NoticeRoute,
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