import {NgModule} from "@angular/core";
import {SearchRESTService} from "./Service/SearchRESTService";
import {SearchFeedResolver} from "./Service/SearchFeedResolver";
import {SearchRequestResolver} from "./Service/SearchFeedRequestResolver";
import {SearchRoute} from "./Route/SerachRoute";
import {CommonModule} from "../Common/CommonModule";
import {RouterModule} from "@angular/router";
import {FeedModule} from "../Feed/FeedModule";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FeedModule
    ],
    providers: [
        SearchRESTService,
        SearchFeedResolver,
        SearchRequestResolver
    ],
    declarations: [
        SearchRoute
    ]
})
export class SerachModule {}