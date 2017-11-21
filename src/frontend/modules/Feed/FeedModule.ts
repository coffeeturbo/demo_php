import {NgModule} from "@angular/core";

import {CommonModule} from "../Common/CommonModule";
import {FeedProfileRoute} from "./Route/FeedProfileRoute/index";
import {FeedRoute} from "./Route/FeedRoute/index";
import {FeedService} from "./Service/FeedService";
import {FeedRESTService} from "./Service/FeedRESTService";
import {FeedComponent} from "./Component/FeedComponent/index";
import {RouterModule} from "@angular/router";
import {PostModule} from "../Post/PostModule";
import {FeedResolver} from "./Service/FeedResolver";
import {FeedCacheService} from "./Service/FeedCacheService";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PostModule
    ],
    declarations: [
        FeedProfileRoute,
        FeedRoute,

        FeedComponent
    ],
    providers: [
        FeedService,
        FeedRESTService,
        FeedCacheService,
        FeedResolver
    ],
    exports: [
        FeedComponent
    ]
})
export class FeedModule {} 