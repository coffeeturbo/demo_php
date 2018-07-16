import {NgModule} from "@angular/core";

import {CommonModule} from "../Common/CommonModule";
import {FeedProfileRoute} from "./Route/FeedProfileRoute";
import {FeedRoute} from "./Route/FeedRoute";
import {FeedService} from "./Service/FeedService";
import {FeedRESTService} from "./Service/FeedRESTService";
import {FeedComponent} from "./Component/Feed";
import {RouterModule} from "@angular/router";
import {PostModule} from "../Post/PostModule";
import {FeedResolver} from "./Service/FeedResolver";
import {FeedCacheService} from "./Service/FeedCacheService";
import {FeedRefreshButtonComponent} from "./Component/FeedRefreshButton";
import {FeedRequestService} from "./Service/FeedRequestService";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostModule
    ],
    declarations: [
        FeedProfileRoute,
        FeedRoute,

        FeedComponent,
        FeedRefreshButtonComponent
    ],
    providers: [
        FeedService,
        FeedRESTService,
        FeedCacheService,
        FeedRequestService,
        FeedResolver
    ],
    exports: [
        PostModule,
        FeedComponent,
        FeedRefreshButtonComponent
    ]
})
export class FeedModule {} 